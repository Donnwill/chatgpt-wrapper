import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        `flex min-h-10 w-full rounded-md border border-chatColors-manatee bg-transparent px-3 py-2 scroll-container 
        shadow-sm placeholder:text-chatColors-manatee focus-visible:outline-none focus-visible:ring-1 max-h-24 font-IBM
        focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
