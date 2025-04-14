"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

export type ConversationInfo = {
  conversationTitle: string;
  conversationId: string;
};

type ConversationState = {
  openConversationsList: ConversationInfo[];
  activeConversation: string;
};

type ConversationAction =
  | { type: "ADD_CONVERSATION"; payload: ConversationInfo }
  | { type: "UPDATE_CONVERSATION_ID"; payload: ConversationInfo }
  | {
      type: "REMOVE_CONVERSATION";
      payload: { conversationName: string; index: number };
    }
  | { type: "SET_ACTIVE_CONVERSATION"; payload: string };

const initialState: ConversationState = {
  openConversationsList: [
    { conversationTitle: "New Conversation", conversationId: "" },
  ],
  activeConversation: "New Conversation",
};

function conversationReducer(
  state: ConversationState,
  action: ConversationAction
): ConversationState {
  switch (action.type) {
    case "ADD_CONVERSATION":
      return {
        ...state,
        openConversationsList: [...state.openConversationsList, action.payload],
      };
    case "UPDATE_CONVERSATION_ID":
      const { conversationTitle, conversationId } = action.payload;
      return {
        ...state,
        openConversationsList: [
          ...state.openConversationsList.map((conversation) =>
            conversation.conversationTitle === conversationTitle
              ? { ...conversation, conversationId: conversationId }
              : conversation
          ),
        ],
      };
    case "REMOVE_CONVERSATION":
      const { conversationName, index } = action.payload;
      const updatedConversations = state.openConversationsList.filter(
        (conversation) => conversation.conversationTitle !== conversationName
      );

      //Making sure the next tab being selected will be an adjacent one.
      let correctedIndex =
        index < updatedConversations.length ? index : index - 1;

      const activeConversation =
        updatedConversations.length === 0
          ? ""
          : updatedConversations[correctedIndex].conversationTitle;

      return {
        ...state,
        openConversationsList: updatedConversations,
        activeConversation,
      };
    case "SET_ACTIVE_CONVERSATION":
      return { ...state, activeConversation: action.payload };
    default:
      return state;
  }
}

const ConversationContext = createContext<
  | {
      conversationState: ConversationState;
      conversationDispatch: React.Dispatch<ConversationAction>;
    }
  | undefined
>(undefined);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [conversationState, conversationDispatch] = useReducer(
    conversationReducer,
    initialState
  );

  return (
    <ConversationContext.Provider
      value={{ conversationState, conversationDispatch }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export function useConversations() {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversations must be used within a ConversationProvider"
    );
  }
  return context;
}
