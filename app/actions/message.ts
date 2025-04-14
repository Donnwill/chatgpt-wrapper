"use server";

import { prisma } from "@/lib/db";

export async function createMessage(data: {
  content: string;
  role: string;
  conversationId: string;
}) {
  try {
    const newMessage = await prisma.message.create({
      data: {
        content: data.content,
        role: data.role,
        conversationId: data.conversationId,
      },
    });

    return newMessage;
  } catch (error: any) {
    return {
      message: "Error during message creation.",
      error: error?.message || error,
    };
  }
}

export async function getMessages(conversationId: string) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error: any) {
    return {
      message: "Error during message fetch request.",
      error: error?.message || error,
    };
  }
}
