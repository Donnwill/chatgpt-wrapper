import { SYSTEM_PROMPT } from "@/app/config/systemPrompt";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { chatHistory, newMessage } = await req.json();

    const headers = {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    };

    const response = await openai.responses.create({
      model: "gpt-4o",
      tools: [{ type: "web_search_preview" }],
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        ...chatHistory,
        newMessage,
      ],
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          if (chunk.type === "response.completed") {
            controller.close();
          }
          if (chunk.type === "response.output_text.delta") {
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
        message: "Something went wrong! please try again later.",
        error: error?.message || error.error,
      },
      { status: 500 }
    );
  }
}
