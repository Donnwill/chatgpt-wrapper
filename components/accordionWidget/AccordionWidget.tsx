import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";

type AccordionWidgetProp = React.HTMLAttributes<HTMLDivElement> & {
  keyValue: string;
  trigger: ReactNode;
};

export default function AccordionWidget({
  keyValue,
  children,
  trigger,
}: AccordionWidgetProp) {
  return (
    <AccordionItem value={keyValue}>
      <AccordionTrigger>{trigger}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}
