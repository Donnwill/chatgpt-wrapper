export async function sendQuestion(data: {
  chatHistory: { role: string; content: string }[];
  newMessage: { role: string; content: string };
}) {
  try {
    const response = await fetch("/api/openAI", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    let aiResponse = "";

    while (true) {
      const { done, value } = await reader!.read();
      if (done) {
        return aiResponse;
      }

      const chunk = decoder.decode(value, { stream: true });
      if (response.ok) {
        aiResponse += chunk;
      } else {
        return JSON.parse(chunk);
      }
    }
  } catch (error: any) {
    return {
      message: "Error during OpenAI fetch request. Please try later.",
      error: error?.message || error.error,
    };
  }
}
