import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "block font-mono text-xs uppercase tracking-widest text-accent",
          className
        )}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";
