"use server";

import { SYSTEM_PROMPT } from "@/app/config/systemPrompt";
import { prisma } from "@/lib/db";

export async function createConversation(data: { title: string }) {
  try {
    const newConversation = await prisma.conversation.create({
      data: {
        title: data.title,
        systemPrompt: SYSTEM_PROMPT,
      },
    });

    return newConversation;
  } catch (error: any) {
    return {
      message: "Error during conversation creation request.",
      error: error?.message || error.error,
    };
  }
}
