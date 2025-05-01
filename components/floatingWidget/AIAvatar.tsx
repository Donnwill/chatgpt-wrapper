import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageSquareMore } from "lucide-react";

type AIAvatarProp = React.HTMLAttributes<HTMLDivElement> & {
  showIcon?: boolean;
};

export default function AIAvatar({
  className,
  showIcon = false,
}: AIAvatarProp) {
  return (
    <Avatar
      className={cn(
        `bg-app-primarycolour w-8 h-8 justify-center items-center`,
        className
      )}
    >
      {showIcon ? (
        <MessageSquareMore color="white" />
      ) : (
        <>
          <AvatarImage src="/assets/image/donn.jpeg" alt="@DW" />
          <AvatarFallback>DW</AvatarFallback>
        </>
      )}
    </Avatar>
  );
}
