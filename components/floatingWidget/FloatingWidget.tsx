import { Plus, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import DonnAvatar from "@/components/floatingWidget/DonnAvatar";
import PopoverContentWidget from "@/components/floatingWidget/PopoverContentWidget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useConversations } from "@/context/conversationContext";
import TooltipWidget from "../tooltipWidget/TooltipWidget";
import { useChatbot } from "@/context/chatbotContext";

export default function FloatingWidget() {
  const { conversationState, conversationDispatch } = useConversations();
  const { chatbotState, chatbotDispatch } = useChatbot();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newConversationName, setNewConversationName] = useState("");
  const [error, setError] = useState("");

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  function onHandleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewConversationName(event.target.value);
  }

  function createNewConversation() {
    if (validateConversationName(newConversationName)) {
      conversationDispatch({
        type: "ADD_CONVERSATION",
        payload: { conversationTitle: newConversationName, conversationId: "" },
      });

      onValueChange(newConversationName);
      setNewConversationName("");
      setIsDialogOpen(false);
      setError("");

      //Keeps the scroll always at the end, so the new conversations are displayed. Also without timeout the scroll will not reach the end.
      setTimeout(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollLeft = scrollAreaRef.current.scrollWidth;
        }
      }, 0);
    }
  }

  function validateConversationName(conversationName: string) {
    if (conversationName === "") {
      setError("Conversation Name cannot be empty. Please provide a name.");
      return false;
    }

    if (
      conversationState.openConversationsList.some(
        (conversation) => conversation.conversationTitle === conversationName
      )
    ) {
      setError(
        "Conversation Name already in use. Please provide a different name."
      );
      return false;
    }
    return true;
  }

  // Also, sets the created conversation to active conversation.
  function onValueChange(activeConversation: string) {
    conversationDispatch({
      type: "SET_ACTIVE_CONVERSATION",
      payload: activeConversation,
    });
  }

  function closeConversation(conversationName: string, index: number) {
    conversationDispatch({
      type: "REMOVE_CONVERSATION",
      payload: { conversationName, index },
    });
  }

  // Closes the create conversation Dialog
  function onDialogClose() {
    setError("");
    setNewConversationName("");
    setIsDialogOpen(false);
  }

  return (
    <div>
      {/* Popup to create conversation name */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Conversation</DialogTitle>
            <DialogDescription>
              Start a new conversation with Petra.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label className="font-figtreeSemiBold text-app-primarytext">
              Conversation Name
            </Label>
            <div className="w-[75%]">
              <Input
                onChange={onHandleChange}
                maxLength={15}
                id="conversationName"
                value={newConversationName}
              />
              {error && (
                <p className="text-red-500 text-sm font-IBM">{error}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant={"outline"} onClick={onDialogClose}>
              Close
            </Button>
            <Button onClick={createNewConversation} type="submit">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Conversation popover */}
      <Popover open={chatbotState.isChatbotOpen}>
        <PopoverTrigger
          onClick={() =>
            chatbotDispatch({
              type: "SET_CHATBOT_ACTIVE",
              payload: !chatbotState.isChatbotOpen,
            })
          }
          className="fixed bottom-10 right-10"
        >
          <DonnAvatar
            showIcon
            className="w-12 h-12 shadow-lg transform transition-transform hover:scale-110 hover:shadow-2xl"
          />
        </PopoverTrigger>
        <PopoverContent className="w-[25rem] h-[33rem] m-2 mr-6 p-0">
          <div className="flex flex-row h-[4rem] pl-4 items-center gap-2">
            <DonnAvatar className="w-12 h-12 shadow-lg" />
            <div className="flex flex-col justify-center">
              <h4 className="font-figtreeBold text-lg leading-none text-app-primarytext">
                Donn Williams
              </h4>
              <span className="text-sm font-IBM text-app-secondarytext">
                Want to get to know me? ask away!
              </span>
            </div>
            <TooltipWidget tooltip="Create New Conversation">
              <Button
                onClick={() => setIsDialogOpen(true)}
                size={"icon"}
                className="ml-auto w-8 h-8"
              >
                <Plus />
              </Button>
            </TooltipWidget>
            <TooltipWidget tooltip="Close">
              <Button
                onClick={() =>
                  chatbotDispatch({
                    type: "SET_CHATBOT_ACTIVE",
                    payload: false,
                  })
                }
                size={"icon"}
                className="mr-2 w-8 h-8"
              >
                <X />
              </Button>
            </TooltipWidget>
          </div>
          <Tabs
            value={conversationState.activeConversation}
            onValueChange={onValueChange}
            className="m-0"
          >
            <TabsList
              ref={scrollAreaRef}
              className="w-full overflow-x-auto scroll-container-tabs"
            >
              {conversationState.openConversationsList.map(
                (conversation, index) => (
                  <TabsTrigger
                    key={index}
                    value={conversation.conversationTitle}
                    className="relative w-[100%]"
                  >
                    {conversation.conversationTitle}
                    {conversation.conversationTitle ===
                      conversationState.activeConversation && (
                      <X
                        onClick={() => {
                          closeConversation(
                            conversation.conversationTitle,
                            index
                          );
                        }}
                        className="absolute w-3 h-3 top-1 right-1"
                      />
                    )}
                  </TabsTrigger>
                )
              )}
            </TabsList>
            {conversationState.openConversationsList.map(
              (conversation, index) => (
                <TabsContent key={index} value={conversation.conversationTitle}>
                  <PopoverContentWidget
                    conversationId={conversation.conversationId}
                    conversationTitle={conversation.conversationTitle}
                  />
                </TabsContent>
              )
            )}
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
}
