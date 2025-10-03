import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = "my_whatsapp_secret_123";

// GET request → webhook verification
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

// POST request → incoming messages
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Incoming WhatsApp webhook:", JSON.stringify(body, null, 2));

  return new NextResponse("EVENT_RECEIVED", { status: 200 });
}
