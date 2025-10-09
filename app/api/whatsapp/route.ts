import { SYSTEM_PROMPT } from "@/config/systemPrompt";
import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = "my_whatsapp_secret_123";
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN!;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

// 🧠 Simple in-memory chat history (per WhatsApp user)
const sessions: Record<string, { role: string; content: string }[]> = {};

// ✅ GET → Verify webhook (already working)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

// ✅ POST → Handle incoming messages and reply via OpenAI
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Incoming webhook:", JSON.stringify(body, null, 2));

  try {
    const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message || !message.text) {
      return new NextResponse("No message text", { status: 200 });
    }

    const userText = message.text.body;
    const from = message.from; // user’s WhatsApp number

    // 🧠 Step 1: Retrieve or create conversation memory
    const session = sessions[from] || [];
    session.push({ role: "user", content: userText });

    // Keep the last 10 messages for efficiency
    if (session.length > 50) session.shift();

    const aiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...session],
        }),
      }
    ).then((res) => res.json());

    const aiReply =
      aiResponse.choices?.[0]?.message?.content || "Sorry, I didn’t get that.";

    // 🧠 Step 4: Save assistant’s reply in session
    session.push({ role: "assistant", content: aiReply });
    sessions[from] = session;

    // 💬 Step 5: Send reply back to WhatsApp user
    await fetch(
      `https://graph.facebook.com/v23.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: from,
          type: "text",
          text: { body: aiReply },
        }),
      }
    );

    return new NextResponse("EVENT_RECEIVED", { status: 200 });
  } catch (err) {
    console.error("Error handling message:", err);
    return new NextResponse("Error", { status: 500 });
  }
}
