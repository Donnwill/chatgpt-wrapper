import { SYSTEM_PROMPT } from "@/app/config/systemPrompt";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();

    const newConversation = await prisma.conversation.create({
      data: {
        title: title,
        systemPrompt: SYSTEM_PROMPT,
      },
    });

    return NextResponse.json(newConversation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to create conversation in the database: ",
        error: error?.message || error.error,
      },
      { status: 500 }
    );
  }
}
