import { cn } from "@/lib/utils";

type UserMessageWidgetProp = React.HTMLAttributes<HTMLDivElement>;

export default function UserMessageWidget({
  children,
  className,
}: UserMessageWidgetProp) {
  return (
    <div
      className={cn(
        `font-IBM text-black bg-chatColors-linkWater rounded-lg mb-2 p-2 mr-2 max-w-[70%] 
      break-words ml-auto w-fit`,
        className
      )}
    >
      {children}
    </div>
  );
}
