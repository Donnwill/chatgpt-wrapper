"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

type ChatbotState = {
  isChatbotOpen: boolean;
};

type ChatbotAction = { type: "SET_CHATBOT_ACTIVE"; payload: boolean };

const initialState: ChatbotState = {
  isChatbotOpen: true,
};

function chatbotReducer(
  state: ChatbotState,
  action: ChatbotAction
): ChatbotState {
  switch (action.type) {
    case "SET_CHATBOT_ACTIVE":
      return { isChatbotOpen: action.payload };
    default:
      return state;
  }
}

const ChatbotContext = createContext<
  | {
      chatbotState: ChatbotState;
      chatbotDispatch: React.Dispatch<ChatbotAction>;
    }
  | undefined
>(undefined);

export const ChatbotProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chatbotState, chatbotDispatch] = useReducer(
    chatbotReducer,
    initialState
  );

  return (
    <ChatbotContext.Provider
      value={{ chatbotState, chatbotDispatch }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error(
      "useChatbot must be used within a ChatbotProvider"
    );
  }
  return context;
}
