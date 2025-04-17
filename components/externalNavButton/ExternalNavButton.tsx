import TooltipWidget from "@/components/tooltipWidget/TooltipWidget";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { MouseEventHandler } from "react";

type ExternalNavButtonProps = {
  Icon: LucideIcon;
  tooltip: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function ExternalNavButton({
  Icon,
  tooltip,
  onClick,
}: ExternalNavButtonProps) {
  return (
    <TooltipWidget tooltip={tooltip}>
      <Button size={"custom"} onClick={onClick}>
        <Icon className="w-5 h-5" />
      </Button>
    </TooltipWidget>
  );
}
