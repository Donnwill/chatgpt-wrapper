import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ContactFormData } from "./contactContent";

export type InputWidgetProp = React.HTMLAttributes<HTMLDivElement> & {
  placeholder: string;
  label: string;
  name: keyof ContactFormData;
  error: string;
};

export default function InputWidget({
  placeholder,
  label,
  name,
  error,
}: InputWidgetProp) {
  return (
    <>
      <Label>{label}</Label>
      {name === "message" ? (
        <Textarea
          name={name}
          className={cn(
            "min-h-32 max-h-48",
            error && "border-red-500 focus-visible:ring-red-500"
          )}
          placeholder={placeholder}
        />
      ) : (
        <Input
          className={cn(error && "border-red-500 focus-visible:ring-red-500")}
          name={name}
          placeholder={placeholder}
        />
      )}
      {error && (
        <p className="text-[#AE320E] font-IBM text-sm whitespace-pre-line -mt-2">
          {error}
        </p>
      )}
    </>
  );
}
