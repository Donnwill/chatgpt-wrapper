export async function speechToText(data: FormData) {
  try {
    const response = await fetch("/api/speechToText", {
      method: "POST",
      body: data,
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");

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
      message: "Error during SpeechToText fetch request. Please try later.",
      error: error?.message || error.error,
    };
  }
}
