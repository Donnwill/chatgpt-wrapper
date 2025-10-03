// pages/api/whatsapp.ts (Next.js pages dir)
// or app/api/whatsapp/route.ts if using App Router
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  if (req.method === "GET") {
    // Verification challenge
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.status(403);
    }
  }

  if (req.method === "POST") {
    try {
      const message = req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

      if (message && message.text) {
        const userText = message.text.body;

        // Call your existing OpenAI API endpoint
        const aiRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/openAI`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chatHistory: [],
              newMessage: { role: "user", content: userText },
            }),
          }
        );

        const aiReply = await aiRes.text(); // you may need to adapt this if streaming

        // Send reply back to WhatsApp
        await fetch(
          `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              to: message.from,
              text: { body: aiReply },
            }),
          }
        );
      }

      return res.status(200);
    } catch (err) {
      console.error("Webhook error", err);
      return res.status(500);
    }
  }

  return res.status(405);
}
