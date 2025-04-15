'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import {
	CheckCircle2,
	ChevronDown,
	UserCircle,
	Mail,
	Pencil,
	Shield,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormSection,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
	username: z
		.string()
		.min(2, {
			message: 'Username must be at least 2 characters.',
		})
		.max(30),
	email: z.string().email({
		message: 'Please enter a valid email address.',
	}),
	bio: z.string().max(160).optional(),
	role: z.string({
		required_error: 'Please select a role.',
	}),
});

export function ProfileForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			email: '',
			bio: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			console.log(values);
			setIsSubmitting(false);
			setIsSuccess(true);

			// Reset success message after 3 seconds
			setTimeout(() => setIsSuccess(false), 3000);
		}, 1000);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'
			>
				<FormSection
					title='Personal Information'
					description='Enter your profile details below.'
					className='bg-gradient-to-br from-background to-background/80 hover:shadow-elevation-2 transition-all duration-300'
				>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='flex items-center gap-2 text-primary-foreground/90 font-semibold pl-1'>
									<UserCircle className='h-4 w-4 text-primary' />
									Username
								</FormLabel>
								<FormControl showValidation>
									<Input
										placeholder='Enter username'
										className='shadow-sm border-input/80 focus-visible:border-primary/40 focus-visible:shadow-[0_0_0_4px_rgba(var(--primary-rgb),0.1)] transition-all duration-200'
										{...field}
									/>
								</FormControl>
								<FormDescription className='text-muted-foreground/80 ml-1'>
									This is your public display name.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='flex items-center gap-2 text-primary-foreground/90 font-semibold pl-1'>
									<Mail className='h-4 w-4 text-primary' />
									Email
								</FormLabel>
								<FormControl showValidation>
									<Input
										type='email'
										placeholder='Enter email address'
										className='shadow-sm border-input/80 focus-visible:border-primary/40 focus-visible:shadow-[0_0_0_4px_rgba(var(--primary-rgb),0.1)] transition-all duration-200'
										{...field}
									/>
								</FormControl>
								<FormDescription className='text-muted-foreground/80 ml-1'>
									We'll never share your email with anyone
									else.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</FormSection>

				<FormSection
					title='Additional Details'
					className='bg-gradient-to-br from-background to-background/80 hover:shadow-elevation-2 transition-all duration-300'
				>
					<FormField
						control={form.control}
						name='bio'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='flex items-center gap-2 text-primary-foreground/90 font-semibold pl-1'>
									<Pencil className='h-4 w-4 text-secondary' />
									Bio
								</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Tell us a little bit about yourself'
										className='shadow-sm border-input/80 focus-visible:border-secondary/40 focus-visible:shadow-[0_0_0_4px_rgba(var(--secondary-rgb),0.1)] resize-none min-h-[100px] transition-all duration-200'
										{...field}
									/>
								</FormControl>
								<FormDescription className='text-muted-foreground/80 ml-1'>
									Your bio will be displayed on your public
									profile.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='role'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='flex items-center gap-2 text-primary-foreground/90 font-semibold pl-1'>
									<Shield className='h-4 w-4 text-accent' />
									Role
								</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger
											className='shadow-sm border-input/80 focus-visible:border-accent/40 focus-visible:shadow-[0_0_0_4px_rgba(var(--accent-rgb),0.1)] transition-all duration-200'
											icon={
												<ChevronDown className='h-4 w-4 text-muted-foreground opacity-50' />
											}
										>
											<SelectValue placeholder='Select a role' />
										</SelectTrigger>
										<SelectContent className='shadow-elevation-2 border border-border/40 backdrop-blur-sm'>
											<SelectItem
												value='admin'
												className='font-medium text-destructive hover:text-destructive-foreground hover:bg-destructive/10 focus:bg-destructive/20 rounded-sm my-0.5 cursor-pointer'
											>
												Admin
											</SelectItem>
											<SelectItem
												value='user'
												className='font-medium text-primary hover:text-primary-foreground hover:bg-primary/10 focus:bg-primary/20 rounded-sm my-0.5 cursor-pointer'
											>
												User
											</SelectItem>
											<SelectItem
												value='guest'
												className='font-medium text-accent hover:text-accent-foreground hover:bg-accent/10 focus:bg-accent/20 rounded-sm my-0.5 cursor-pointer'
											>
												Guest
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormDescription className='text-muted-foreground/80 ml-1'>
									This determines your permissions level.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</FormSection>

				<div className='flex justify-between gap-4 items-center'>
					<div className='transition-opacity duration-500'>
						{isSuccess && (
							<span className='inline-flex items-center text-sm gap-1.5 text-primary font-medium bg-primary/10 px-4 py-2 rounded-full'>
								<CheckCircle2 className='h-4 w-4' /> Profile
								updated successfully!
							</span>
						)}
					</div>
					<div className='flex gap-3'>
						<Button
							type='button'
							variant='outline'
							className='rounded-full border-primary/30 hover:border-primary/50 px-5 shadow-sm hover:shadow-md transition-all duration-200'
						>
							Cancel
						</Button>
						<Button
							type='submit'
							className='rounded-full px-5 bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary/80 shadow-md hover:shadow-lg transition-all duration-200'
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Saving...' : 'Save Profile'}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
