import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#006ce4] text-primary-foreground shadow hover:bg-[#0057b8]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",

        navBarUnderline:
          "bg-wite hover:bg-[#1a1a1a0f] rounded-none shadow-[inset_0_-1.1px_0_#e7e7e7]",
        navBarUnderlineSelected:
          " bg-wite hover:bg-[#1a1a1a0f] rounded-none  text-primary shadow-[inset_0_-2.1px_0_#2563eb]",

        ghost: "hover:bg-accent hover:text-accent-foreground",
        ghostNav:
          "border border-transparent hover:border-sky-600 hover:bg-accent hover:text-accent-foreground hover:text-sky-600",
        ghostTopNav: " hover:bg-hoverBgSoftBlue",
        link: "text-primary underline-offset-4 hover:underline",
        simpleLink: "text-primary hover:bg-softBlue",
        navBarRounded: "rounded-full border-[1px] border-navBarRoundedButton",
        disabled: "cursor-not-allowed bg-softGray text-[#a2a2a2]",
        negativeDefault:
          "bg-white border-[1.5px] border-buttonBlue text-buttonBlue hover:bg-softBlue py-[18px] rounded-lg",
        iconHover: "w-10 h-10 hover:bg-[#e3e3e3] rounded-lg",
        avatar: "hover:bg-[#324f9d]",

      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        navBarUnderline: "p-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
