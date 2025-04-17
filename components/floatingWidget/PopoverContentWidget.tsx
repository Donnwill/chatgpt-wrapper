import { StepForward } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import { createMessage, getMessages } from "@/app/actions/message";
import { sendQuestion } from "@/app/utils/client/openAI";
import PetraMessageWidget from "@/components/floatingWidget/DonnMessageWidget";
import ChatBubble from "@/components/floatingWidget/ChatBubble";
import UserMessageWidget from "@/components/floatingWidget/UserMessageWidget";
import { createConversation } from "@/app/actions/conversation";
import { useConversations } from "@/context/conversationContext";
import TooltipWidget from "../tooltipWidget/TooltipWidget";

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

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<Chat[]>([
    {
      role: "assistant",
      content:
        "Hello! my name is Donn Williams. Get to know me by asking a question",
      createdAt: new Date(),
    },
  ]);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  //Keeps the scroll always at the end, so the new chats are displayed.
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chats]);

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
    const currentConversationId =
      conversationId === "" ? await startConversation() : conversationId;

    setIsGeneratingResponse(true);
    setMessage("");

    try {
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

  return (
    <div className="flex flex-col justify-between h-[26rem] p-2">
      <div ref={scrollAreaRef} className="overflow-y-auto scroll-container">
        {chats.map((chatLog, index) =>
          chatLog.role === "assistant" ? (
            <PetraMessageWidget key={index}>
              <ChatBubble
                content={chatLog.content}
                createdAt={chatLog.createdAt.toString()}
              />
            </PetraMessageWidget>
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
          <PetraMessageWidget className="w-12 h-12">
            <img src={"/assets/gif/typing.gif"} alt="Typing..." />
          </PetraMessageWidget>
        )}
      </div>
      <div className="grid grid-cols-6 items-center gap-2 mt-1">
        <Textarea
          ref={textareaRef}
          placeholder={
            isGeneratingResponse ? "Please wait..." : "Ask you question"
          }
          value={message}
          disabled={isGeneratingResponse}
          className="col-span-5 rounded-lg"
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <TooltipWidget tooltip="Send Message">
          <Button
            disabled={isGeneratingResponse}
            className="col-span-1"
            onClick={() => saveMessage(conversationId, message)}
          >
            <StepForward />
          </Button>
        </TooltipWidget>
      </div>
    </div>
  );
}
