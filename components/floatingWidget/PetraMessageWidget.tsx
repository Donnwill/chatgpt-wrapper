import PetraAvatar from "@/components/floatingWidget/PetraAvatar";
import { cn } from "@/lib/utils";

type PetraMessageWidgetProp = React.HTMLAttributes<HTMLDivElement>;

export default function PetraMessageWidget({
  children,
  className,
}: PetraMessageWidgetProp) {
  return (
    <div className="flex flex-row gap-2 mb-4">
      <PetraAvatar />
      <div className={"flex flex-col gap-1 max-w-[70%]"}>
        <h4 className="font-figtreeSemiBold leading-none">Donn</h4>
        <div
          className={cn(
            "font-IBM text-white p-2 inline-block rounded-lg bg-chatColors-cinder break-words",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
