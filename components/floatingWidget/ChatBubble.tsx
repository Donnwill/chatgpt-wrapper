type ChatBubbleProp = {
  content: string;
  createdAt: string;
};

export default function ChatBubble({ content, createdAt }: ChatBubbleProp) {
  // This is to display the exact time of the conversation. with HH:MM
  function getTime(dateTime: string): string {
    return new Date(dateTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div>
      <p className="text-sm">{content}</p>
      <p className="text-right text-xs text-chatColors-manatee">
        {getTime(createdAt.toString())}
      </p>
    </div>
  );
}
