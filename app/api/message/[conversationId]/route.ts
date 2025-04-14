import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { conversationId: string } }) {
    try {
      const messages = await prisma.message.findMany({
        where: { conversationId: params.conversationId },
        orderBy: { createdAt: 'asc' },
      });
  
      return NextResponse.json(messages, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        {
          message: "ailed to fetch messages: ",
          error: error?.message || error.error,
        },
        { status: 500 }
      );
    }
  }