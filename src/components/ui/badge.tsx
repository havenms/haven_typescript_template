import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all shadow-sm overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-primary/10 dark:border-primary/20 text-shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-100 active:shadow-sm",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground border-secondary/10 dark:border-secondary/20 text-shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-100 active:shadow-sm",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/90 text-white border-destructive/10 dark:border-destructive/20 text-shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-100 active:shadow-sm focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "bg-background/50 text-foreground backdrop-blur-[2px] border-input hover:bg-accent/10 hover:text-accent-foreground hover:border-accent/50 hover:shadow-md active:shadow-sm",
        accent:
          "bg-gradient-to-r from-accent to-accent/90 text-accent-foreground border-accent/10 dark:border-accent/20 text-shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-100 active:shadow-sm",
        subtle:
          "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground hover:shadow-sm active:shadow-none",
        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-accent/10 hover:text-accent-foreground active:bg-accent/20",
      },
      size: {
        default: "h-5 px-2.5 py-0.5 text-xs",
        sm: "h-4 px-1.5 py-px text-[10px]",
        lg: "h-6 px-3 py-1 text-sm",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }