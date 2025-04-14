import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type PetraAvatarProp = React.HTMLAttributes<HTMLDivElement>;

export default function PetraAvatar({ className }: PetraAvatarProp) {
  return (
    <Avatar className={cn(`bg-red-200 w-8 h-8`, className)}>
      <AvatarImage
        src="https://framerusercontent.com/images/756qWnUHdW5aMKbgEvPyDoHisAc.png"
        alt="@shadcn"
      />
      <AvatarFallback>PA</AvatarFallback>
    </Avatar>
  );
}
