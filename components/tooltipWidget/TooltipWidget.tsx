import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type TooltipWidgetProp = React.HTMLAttributes<HTMLDivElement> & {
  tooltip: string;
  duration?: number;
};

export default function TooltipWidget({
  children,
  tooltip,
  duration = 2000,
}: TooltipWidgetProp) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [timeouts, setTimeouts] = useState<{
    showTimeout: NodeJS.Timeout | null;
    hideTimeout: NodeJS.Timeout | null;
  }>({
    showTimeout: null,
    hideTimeout: null,
  });

  function onMouseEnter() {
    //The tooltip will start showing at 1000
    const showTooltipTimeOut = setTimeout(() => {
      setShowTooltip(true);
    }, 1000);

    //The tooltip will show for 2000 combining the start it is 2000
    const hideTooltipTimeOut = setTimeout(() => {
      setShowTooltip(false);
    }, duration);

    setTimeouts({
      showTimeout: showTooltipTimeOut,
      hideTimeout: hideTooltipTimeOut,
    });
  }

  function onMouseLeave() {
    if (timeouts.showTimeout) {
      clearTimeout(timeouts.showTimeout);
    }
    if (timeouts.hideTimeout) {
      clearTimeout(timeouts.hideTimeout);
    }
    setShowTooltip(false);
  }

  return (
    <Tooltip open={showTooltip}>
      <TooltipTrigger
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        asChild
      >
        {children}
      </TooltipTrigger>
      <TooltipContent className="bg-chatColors-gunmetal font-IBM text-sm max-w-64">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
