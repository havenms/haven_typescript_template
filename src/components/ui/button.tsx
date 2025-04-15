import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
					'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md hover:shadow-lg hover:from-primary/95 hover:to-primary/85 active:shadow-sm transition-shadow border border-primary/10 dark:border-primary/20 text-shadow-sm',
				destructive:
					'bg-gradient-to-r from-destructive to-destructive/90 text-white shadow-md hover:shadow-lg hover:from-destructive/95 hover:to-destructive/85 active:shadow-sm border border-destructive/10 dark:border-destructive/20 text-shadow-sm',
				outline:
					'bg-background text-foreground shadow-sm hover:shadow-md hover:bg-accent/10 hover:text-accent-foreground border border-input hover:border-accent/50 dark:hover:bg-accent/20 dark:border-input/80 transition-colors',
				secondary:
					'bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground shadow-md hover:shadow-lg hover:from-secondary/95 hover:to-secondary/85 active:shadow-sm border border-secondary/10 dark:border-secondary/20 text-shadow-sm',
				ghost: 'hover:bg-accent/10 hover:text-accent-foreground dark:hover:bg-accent/20 transition-colors text-foreground hover:shadow-sm',
				link: 'text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors font-medium px-0 py-0 h-auto',
				accent: 'bg-gradient-to-r from-accent to-accent/90 text-accent-foreground shadow-md hover:shadow-lg hover:from-accent/95 hover:to-accent/85 active:shadow-sm border border-accent/10 dark:border-accent/20 text-shadow-sm',
			},
			size: {
				default: 'h-10 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-11 rounded-md px-6 has-[>svg]:px-4 text-base',
				icon: 'h-10 w-10',
				pill: 'h-10 rounded-full px-5',
				'pill-sm': 'h-9 rounded-full px-4 text-xs',
				'pill-lg': 'h-11 rounded-full px-6 text-base',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

// Add this custom utility class to your globals.css
const textShadowUtility = `
@layer utilities {
  .text-shadow-sm {
    text-shadow: 0 1px 1px rgba(0,0,0,0.2);
  }
  
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
}
`;

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
