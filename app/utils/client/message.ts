export async function createMessage(data: {
  content: string;
  role: string;
  conversationId: string;
}) {
  try {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseJSON = await response.json();

    if (!response.ok) {
      return { message: responseJSON.message, error: responseJSON.error };
    }

    return responseJSON;
  } catch (error: any) {
    return {
      message: "Error during message creation request.",
      error: error?.message || error.error,
    };
  }
}

export async function getMessages(conversationId: string) {
  try {
    const response = await fetch(`/api/message/${conversationId}`);
    const responseJSON = await response.json();

    if (!response.ok) {
      return { message: responseJSON.message, error: responseJSON.error };
    }

    return responseJSON;
  } catch (error: any) {
    return {
      message: "Error during message fetch request.",
      error: error?.message || error.error,
    };
  }
}
