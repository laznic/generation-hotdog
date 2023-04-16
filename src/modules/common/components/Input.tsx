import * as React from "react"
 
import { cn } from "@/util"
 
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
 
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border bg-transparent py-2 px-3 text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
 
export { Input }