'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
	Controller,
	FormProvider,
	useFormContext,
	useFormState,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
} from 'react-hook-form';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();
	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>');
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		formState,
		...fieldState,
	};
};

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue
);

function FormItem({
	className,
	...props
}: React.ComponentProps<'div'> & {
	variant?: 'default' | 'card' | 'outline';
}) {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot='form-item'
				className={cn(
					'grid gap-2 relative transition-all duration-200 rounded-md',
					className
				)}
				{...props}
			/>
		</FormItemContext.Provider>
	);
}

function FormLabel({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	const { error, formItemId } = useFormField();

	return (
		<Label
			data-slot='form-label'
			data-error={!!error}
			className={cn(
				'font-medium text-sm mb-1 transition-colors',
				'data-[error=true]:text-destructive data-[error=true]:font-semibold',
				className
			)}
			htmlFor={formItemId}
			{...props}
		/>
	);
}

function FormControl({
	className,
	showValidation, // Extract it separately
	...props // All other props
}: React.ComponentProps<typeof Slot> & {
	showValidation?: boolean;
}) {
	const { error, formItemId, formDescriptionId, formMessageId, formState } =
		useFormField();
	const { touchedFields, dirtyFields } = formState;
	const fieldName = (formItemId || '').replace('-form-item', '');
	const showSuccess =
		showValidation &&
		touchedFields[fieldName] &&
		dirtyFields[fieldName] &&
		!error;

	return (
		<div className='relative'>
			<Slot
				data-slot='form-control'
				id={formItemId}
				aria-describedby={
					!error
						? `${formDescriptionId}`
						: `${formDescriptionId} ${formMessageId}`
				}
				aria-invalid={!!error}
				className={cn(
					'transition-all duration-200',
					error &&
						'focus-visible:ring-destructive/20 border-destructive/50',
					showSuccess &&
						'border-primary/40 focus-visible:ring-primary/20',
					className
				)}
				{...props} // Now props won't include showValidation
			/>
			{error && (
				<AlertCircle className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive opacity-80' />
			)}
			{showSuccess && (
				<CheckCircle2 className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-80' />
			)}
		</div>
	);
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
	const { formDescriptionId } = useFormField();

	return (
		<p
			data-slot='form-description'
			id={formDescriptionId}
			className={cn('text-muted-foreground text-xs mt-1 ml-1', className)}
			{...props}
		/>
	);
}

function FormMessage({
	className,
	children,
	...props
}: React.ComponentProps<'div'>) {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? '') : children;

	if (!body) {
		return null;
	}

	return (
		<div
			data-slot='form-message'
			id={formMessageId}
			aria-live='polite'
			className={cn(
				'flex items-center gap-1.5 text-destructive text-xs font-medium mt-1 ml-1',
				'bg-destructive/10 rounded-sm px-2 py-1',
				className
			)}
			{...props}
		>
			<AlertCircle className='h-3 w-3' />
			<p>{body}</p>
		</div>
	);
}

// Add this new component for grouped form sections
function FormSection({
	title,
	description,
	children,
	className,
	...props
}: React.ComponentProps<'div'> & {
	title?: string;
	description?: string;
}) {
	return (
		<div
			className={cn(
				'p-4 border border-border/30 rounded-lg mb-6 relative',
				'bg-gradient-to-b from-background/50 to-background',
				'shadow-sm hover:shadow-elevation-1 transition-shadow',
				className
			)}
			{...props}
		>
			{title && (
				<div className='border-b border-border/20 pb-2 mb-4'>
					<h3 className='text-base font-medium'>{title}</h3>
					{description && (
						<p className='text-muted-foreground text-sm mt-1'>
							{description}
						</p>
					)}
				</div>
			)}
			<div className='space-y-4'>{children}</div>
		</div>
	);
}

export {
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
	FormSection,
};
