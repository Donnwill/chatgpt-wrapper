import AIAvatar from "@/components/floatingWidget/AIAvatar";
import { cn } from "@/lib/utils";

type AIMessageWidgetProp = React.HTMLAttributes<HTMLDivElement>;

export default function AIMessageWidget({
  children,
  className,
}: AIMessageWidgetProp) {
  return (
    <div className="flex flex-row gap-2 mb-4">
      <AIAvatar />
      <div className={"flex flex-col gap-1 max-w-[70%]"}>
        <h4 className="font-figtreeSemiBold text-app-primarytext leading-none">
          Donn
        </h4>
        <div
          className={cn(
            "font-IBM text-app-buttonText p-2 inline-block rounded-lg bg-app-primarycolour break-words",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
