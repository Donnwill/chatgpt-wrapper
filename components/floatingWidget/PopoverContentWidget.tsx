import { Mic, StepForward } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import { createMessage, getMessages } from "@/actions/message";
import { sendQuestion } from "@/utils/client/openAI";
import AIMessageWidget from "@/components/floatingWidget/AIMessageWidget";
import ChatBubble from "@/components/floatingWidget/ChatBubble";
import UserMessageWidget from "@/components/floatingWidget/UserMessageWidget";
import { createConversation } from "@/actions/conversation";
import { useConversations } from "@/context/conversationContext";
import TooltipWidget from "../tooltipWidget/TooltipWidget";
import { useTranslation } from "react-i18next";
import { speechToText } from "@/utils/client/speechToText";

const role = ["user", "assistant", "system"] as const;
export type Role = (typeof role)[number];

type Chat = {
  role: Role;
  content: string;
  createdAt: Date;
};

type PopoverContentWidget = {
  conversationTitle: string;
  conversationId: string;
};

export default function PopoverContentWidget({
  conversationId,
  conversationTitle,
}: PopoverContentWidget) {
  const { conversationDispatch } = useConversations();
  const { t } = useTranslation();

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<Chat[]>([
    {
      role: "assistant",
      content: t("firstAIMessage"),
      createdAt: new Date(),
    },
  ]);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  //Keeps the scroll always at the end, so the new chats are displayed.
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chats, isRecording]);

  // Get the message history based on the opened tab
  useEffect(() => {
    async function getMessageHistory() {
      try {
        const messageHistory = await getMessages(conversationId);

        if ("error" in messageHistory) {
          updateChatHistory("assistant", "Unable to fetch message history");
          return;
        }

        setChats(
          messageHistory.map((message) => ({
            role: message.role as Role,
            content: message.content,
            createdAt: message.createdAt,
          }))
        );
      } catch (error: any) {
        updateChatHistory("assistant", "Unable to fetch message history");
      }
    }
    if (conversationId !== "") {
      getMessageHistory();
    }
  }, []);

  // Pressing "Enter" will trigger conversation
  async function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      await saveMessage(conversationId, message);
    }
  }

  async function saveMessage(conversationId: string, message: string) {
    setIsGeneratingResponse(true);
    setMessage("");

    try {
      const currentConversationId =
        conversationId === "" ? await startConversation() : conversationId;

      await handleMessages(message, "user", currentConversationId);
      const assistantMessage = await fetchAssistantResponse(message);
      await handleMessages(
        assistantMessage,
        "assistant",
        currentConversationId
      );
    } catch (error) {
      console.error("Error saving messages", error);
    } finally {
      setIsGeneratingResponse(false);

      // This helps in retaining the text area focus. Using timeout is essential else it will not retain focus
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    }
  }

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Handles the message for both user and assistant. Saves to the database and updates the chat history.
  async function handleMessages(
    message: string,
    role: Role,
    conversationId: string
  ) {
    updateChatHistory(role, message);

    const result = await createMessage({
      content: message,
      role: role,
      conversationId,
    });

    if ("error" in result) {
      // should not have console.error in prod build, we can use aptabase to handle error better
      console.error("Failed to create Message in db.");
    }
  }

  async function fetchAssistantResponse(message: string) {
    const chatHistory = chats.map(({ role, content }) => ({ role, content }));
    const newMessage = { role: "user", content: message };

    const response = await sendQuestion({ chatHistory, newMessage });
    return response?.message || response;
  }

  // Creates a conversation in db
  async function startConversation() {
    const conversationResponse = await createConversation({
      title: conversationTitle,
    });

    if (!conversationResponse || "error" in conversationResponse) {
      return "";
    }

    // This will create the first message to the database when the user sends in the first request, because when we
    // retreive message from the database for multi tabs the initial message will be lost as it is hardcoded. There
    // will the issue with the time, and I hope that is not a big issue. Also we dont want to create a new conversation
    // everytime the user creates a new tab.
    await createMessage({
      content: chats[0].content,
      role: chats[0].role,
      conversationId: conversationResponse.id,
    });

    conversationDispatch({
      type: "UPDATE_CONVERSATION_ID",
      payload: {
        conversationId: conversationResponse.id,
        conversationTitle: conversationTitle,
      },
    });

    return conversationResponse.id;
  }

  function updateChatHistory(role: Role, content: string) {
    setChats((prev) => [
      ...prev,
      {
        role,
        content,
        createdAt: new Date(),
      },
    ]);
  }

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("file", blob, "audio.webm");

      const transcription = await speechToText(formData);
      setIsTranscribing(false);

      if (typeof transcription !== "string") {
        updateChatHistory(
          "user",
          transcription.message ?? "Something went wrong"
        );
      } else {
        await saveMessage(conversationId, transcription);
      }
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
  }

  function stopRecording() {
    if (mediaRecorderRef.current?.state === "recording") {
      setIsTranscribing(true);

      mediaRecorderRef.current.stop();
      setIsRecording(false);

      const tracks = mediaRecorderRef.current?.stream?.getTracks();
      tracks?.forEach((track) => track.stop());
    }
  }

  return (
    <div className="flex flex-col justify-between sm:h-[26rem] h-[22rem] p-2">
      <div ref={scrollAreaRef} className="overflow-y-auto scroll-container">
        {chats.map((chatLog, index) =>
          chatLog.role === "assistant" ? (
            <AIMessageWidget key={index}>
              <ChatBubble
                content={chatLog.content}
                createdAt={chatLog.createdAt.toString()}
              />
            </AIMessageWidget>
          ) : (
            <UserMessageWidget key={index}>
              <ChatBubble
                content={chatLog.content}
                createdAt={chatLog.createdAt.toString()}
              />
            </UserMessageWidget>
          )
        )}
        {isGeneratingResponse && (
          <AIMessageWidget className="w-12 h-12">
            <img src={"/assets/gif/typing.gif"} alt="Typing..." />
          </AIMessageWidget>
        )}
        {isRecording && (
          <UserMessageWidget className="w-12 h-12">
            <img src={"/assets/gif/mic.gif"} alt="Recording..." />
          </UserMessageWidget>
        )}
        {isTranscribing && (
          <UserMessageWidget className="w-12 h-12">
            <img src={"/assets/gif/typing.gif"} alt="Transcribing..." />
          </UserMessageWidget>
        )}
      </div>
      <div className="grid grid-cols-6 items-center gap-2 mt-1">
        <Textarea
          ref={textareaRef}
          placeholder={
            isGeneratingResponse ? "Please wait..." : "Ask you question"
          }
          value={message}
          disabled={isGeneratingResponse || isTranscribing}
          className="col-span-4 rounded-lg"
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <TooltipWidget tooltip={t("sendMessage")}>
          <Button
            disabled={isGeneratingResponse || isTranscribing}
            className="col-span-1"
            size={"send"}
            onClick={() => saveMessage(conversationId, message)}
          >
            <StepForward />
          </Button>
        </TooltipWidget>
        <Button
          disabled={isGeneratingResponse || isTranscribing}
          className="col-span-1"
          size={"send"}
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onMouseLeave={stopRecording}
        >
          <Mic />
        </Button>
      </div>
    </div>
  );
}
