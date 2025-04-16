import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type DonnAvatarProp = React.HTMLAttributes<HTMLDivElement>;

export default function DonnAvatar({ className }: DonnAvatarProp) {
  return (
    <Avatar className={cn(`bg-red-200 w-8 h-8`, className)}>
      <AvatarImage src="/assets/image/donn.jpeg" alt="@DW" />
      <AvatarFallback>DW</AvatarFallback>
    </Avatar>
  );
}
