import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform-gpu",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 btn-3d",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 btn-3d",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground btn-3d",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 btn-3d",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        medical: "bg-medical-green text-white hover:bg-medical-deep btn-3d font-display font-semibold",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 btn-3d font-bold",
        hero: "bg-gradient-to-r from-medical-green to-medical-deep text-white hover:from-medical-deep hover:to-medical-green btn-3d font-display font-bold border border-medical-bright/20",
      },
      size: {
        default: "h-12 px-6 py-3 text-sm",
        sm: "h-10 rounded-md px-4 text-sm",
        lg: "h-16 rounded-lg px-10 text-lg",
        xl: "h-20 rounded-xl px-12 text-xl",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
