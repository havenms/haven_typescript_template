import * as React from 'react';

import { cn } from '@/lib/utils';

function Card({
	className,
	variant = 'default',
	...props
}: React.ComponentProps<'div'> & {
	variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'outline';
}) {
	return (
		<div
			data-slot='card'
			className={cn(
				'bg-card text-card-foreground relative flex flex-col gap-6 rounded-xl border transition-all duration-200',
				'shadow-sm hover:shadow-elevation-1',
				{
					'border-border/30': variant === 'default',
					'border-t-4 border-t-primary border-border/30 bg-gradient-to-b from-primary/5 to-transparent':
						variant === 'primary',
					'border-t-4 border-t-secondary border-border/30 bg-gradient-to-b from-secondary/5 to-transparent':
						variant === 'secondary',
					'border-t-4 border-t-accent border-border/30 bg-gradient-to-b from-accent/5 to-transparent':
						variant === 'accent',
					'border border-border bg-card/50 backdrop-blur-[2px]':
						variant === 'outline',
				},
				className
			)}
			{...props}
		/>
	);
}

function CardHeader({
	className,
	variant = 'default',
	...props
}: React.ComponentProps<'div'> & {
	variant?: 'default' | 'separated';
}) {
	return (
		<div
			data-slot='card-header'
			className={cn(
				'@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 py-6',
				'has-data-[slot=card-action]:grid-cols-[1fr_auto]',
				{
					'[&:not(:last-child)]:border-b [&:not(:last-child)]:border-border/20':
						variant === 'separated',
				},
				className
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-title'
			className={cn(
				'leading-none font-semibold text-lg flex items-center gap-2',
				className
			)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-description'
			className={cn('text-muted-foreground text-sm mt-1.5', className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-action'
			className={cn(
				'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
				className
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-content'
			className={cn('px-6', '[&:not(:last-child)]:pb-4', className)}
			{...props}
		/>
	);
}

function CardFooter({
	className,
	variant = 'default',
	...props
}: React.ComponentProps<'div'> & {
	variant?: 'default' | 'separated' | 'shaded';
}) {
	return (
		<div
			data-slot='card-footer'
			className={cn(
				'flex items-center px-6 py-4 gap-2',
				{
					'border-t border-border/20 mt-2': variant === 'separated',
					'bg-muted/20 rounded-b-xl mt-2': variant === 'shaded',
				},
				className
			)}
			{...props}
		/>
	);
}

// New component for card accents/decorations
function CardDecoration({
	className,
	position = 'top-right',
	...props
}: React.ComponentProps<'div'> & {
	position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}) {
	return (
		<div
			className={cn(
				'absolute w-20 h-20 rounded-full opacity-20 blur-xl pointer-events-none',
				{
					'top-0 right-0 translate-x-1/4 -translate-y-1/4':
						position === 'top-right',
					'top-0 left-0 -translate-x-1/4 -translate-y-1/4':
						position === 'top-left',
					'bottom-0 right-0 translate-x-1/4 translate-y-1/4':
						position === 'bottom-right',
					'bottom-0 left-0 -translate-x-1/4 translate-y-1/4':
						position === 'bottom-left',
				},
				className
			)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
	CardDecoration,
};
