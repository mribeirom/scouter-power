import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center transition-all",
          variant === "primary" &&
            "bg-primary text-primary-foreground font-display uppercase italic tracking-wide skew-x-[-12deg] hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,157,0,0.3)]",
          variant === "outline" &&
            "border-2 border-foreground text-foreground font-display uppercase italic tracking-wide skew-x-[-12deg] hover:bg-foreground hover:text-background",
          variant === "ghost" && "hover:bg-accent/10 text-accent font-mono border border-accent",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
