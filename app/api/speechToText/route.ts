import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { writeFile, unlink } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import os from "os";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const buffer = Buffer.from(await file.arrayBuffer());
    const tmpDir = os.tmpdir();
    const filePath = path.join(tmpDir, `${uuidv4()}-${file.name}`);

    await writeFile(filePath, buffer);

    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "gpt-4o-mini-transcribe",
      response_format: "text",
      stream: true,
    });

    await unlink(filePath);
  
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          if (chunk.type === "transcript.text.done") {
            controller.close();
          }
          if (chunk.type === "transcript.text.delta") {
            const textChunk = chunk.delta;
            controller.enqueue(textChunk);
          }
        }
      },
    });

    return new NextResponse(stream, {
      headers,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Unable to process your audio, please try again later",
        error: error?.message || error.error,
      },
      { status: 500 }
    );
  }
}
