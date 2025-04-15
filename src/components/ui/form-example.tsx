'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			email: '',
			bio: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
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
				>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl showValidation>
									<Input
										placeholder='Enter username'
										className='shadow-sm border-input/80 focus-visible:border-primary/40'
										{...field}
									/>
								</FormControl>
								<FormDescription>
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
								<FormLabel>Email</FormLabel>
								<FormControl showValidation>
									<Input
										type='email'
										placeholder='Enter email address'
										className='shadow-sm border-input/80 focus-visible:border-primary/40'
										{...field}
									/>
								</FormControl>
								<FormDescription>
									We'll never share your email with anyone
									else.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</FormSection>

				<FormSection title='Additional Details'>
					<FormField
						control={form.control}
						name='bio'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bio</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Tell us a little bit about yourself'
										className='shadow-sm border-input/80 focus-visible:border-primary/40 resize-none min-h-[100px]'
										{...field}
									/>
								</FormControl>
								<FormDescription>
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
								<FormLabel>Role</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger className='shadow-sm border-input/80 focus-visible:border-primary/40'>
											<SelectValue placeholder='Select a role' />
										</SelectTrigger>
										<SelectContent className='shadow-elevation-2'>
											<SelectItem value='admin'>
												Admin
											</SelectItem>
											<SelectItem value='user'>
												User
											</SelectItem>
											<SelectItem value='guest'>
												Guest
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormDescription>
									This determines your permissions level.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</FormSection>

				<div className='flex justify-end gap-4'>
					<Button
						type='button'
						variant='outline'
					>
						Cancel
					</Button>
					<Button type='submit'>Save Profile</Button>
				</div>
			</form>
		</Form>
	);
}
