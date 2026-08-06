import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full bg-background border border-border px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
