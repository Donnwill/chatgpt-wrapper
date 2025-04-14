import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { content, role, conversationId } = await req.json();

    const newMessage = await prisma.message.create({
      data: {
        conversationId,
        content,
        role,
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to create message in the database: ",
        error: error?.message || error.error,
      },
      { status: 500 }
    );
  }
}
