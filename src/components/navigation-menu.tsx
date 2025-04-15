'use client';

import * as React from 'react';
import Link from 'next/link';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import {
	ChevronDown,
	Code,
	Layout,
	Settings,
	User,
	LifeBuoy,
	Home,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';

const NavigationMenu = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
	<NavigationMenuPrimitive.Root
		ref={ref}
		className={cn(
			'relative z-10 flex max-w-max flex-1 items-center justify-center',
			className
		)}
		{...props}
	>
		{children}
		<NavigationMenuViewport />
	</NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.List
		ref={ref}
		className={cn(
			'group flex flex-1 list-none items-center justify-center space-x-1',
			className
		)}
		{...props}
	/>
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
	'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
);

const NavigationMenuTrigger = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<NavigationMenuPrimitive.Trigger
		ref={ref}
		className={cn(navigationMenuTriggerStyle(), 'group', className)}
		{...props}
	>
		{children}{' '}
		<ChevronDown
			className='relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180'
			aria-hidden='true'
		/>
	</NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.Content
		ref={ref}
		className={cn(
			'left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto',
			className
		)}
		{...props}
	/>
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
	<div className={cn('absolute left-0 top-full flex justify-center')}>
		<NavigationMenuPrimitive.Viewport
			className={cn(
				'origin-top-center bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-xl border backdrop-blur-sm  md:w-[var(--radix-navigation-menu-viewport-width)]',
				className
			)}
			ref={ref}
			{...props}
		/>
	</div>
));
NavigationMenuViewport.displayName =
	NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.Indicator
		ref={ref}
		className={cn(
			'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
			className
		)}
		{...props}
	>
		<div className='bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md' />
	</NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
	NavigationMenuPrimitive.Indicator.displayName;

// Custom ListItem component for navigation menu items
const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}
				>
					<div className='text-sm font-medium leading-none'>
						{title}
					</div>
					{/* Replace p tag with div to avoid nesting block elements inside p */}
					<div className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
						{children}
					</div>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = 'ListItem';

// Export the component with all its parts
export {
	navigationMenuTriggerStyle,
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuIndicator,
	NavigationMenuViewport,
	ListItem,
};

// Main app navigation component - updated with better spacing
export function MainNav() {
	return (
		<div className='border-b shadow-elevation-1 bg-gradient-to-r from-background/95 via-background to-background/95 backdrop-blur-[2px]'>
			<div className='container flex h-16 items-center justify-between px-4'>
				{/* Left section - Logo */}
				<div className='flex items-center'>
					<Link
						href='/'
						className='flex items-center'
					>
						<span className='hidden sm:inline-flex bg-primary text-primary-foreground w-8 h-8 rounded-full items-center justify-center font-bold shadow-sm mr-2'>
							H
						</span>
						<span className='text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent'>
							HavenTS Template
						</span>
					</Link>
				</div>

				{/* Center section - Navigation links */}
				<div className='hidden md:flex justify-center flex-1 px-4'>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger>
									Features
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									{/* Keep content the same */}
									<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
										<ListItem
											href='/components'
											title='Components'
										>
											<div className='flex items-center gap-1'>
												<Layout className='h-4 w-4 text-primary' />
												<span>
													Beautiful UI components
													built on Radix UI
												</span>
											</div>
										</ListItem>
										<ListItem
											href='/docs/code'
											title='Developers'
										>
											<div className='flex items-center gap-1'>
												<Code className='h-4 w-4 text-primary' />
												<span>
													Full TypeScript support with
													zero config
												</span>
											</div>
										</ListItem>
										<ListItem
											href='/settings'
											title='Settings'
										>
											<div className='flex items-center gap-1'>
												<Settings className='h-4 w-4 text-primary' />
												<span>
													Customize your experience
												</span>
											</div>
										</ListItem>
										<ListItem
											href='/support'
											title='Support'
										>
											<div className='flex items-center gap-1'>
												<LifeBuoy className='h-4 w-4 text-primary' />
												<span>
													Get help and support from
													our team
												</span>
											</div>
										</ListItem>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuTrigger>
									Resources
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									{/* Keep content the same */}
									<ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px]'>
										<li className='row-span-3'>
											<NavigationMenuLink asChild>
												<div
													className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/5 to-primary/20 p-6 no-underline outline-none focus:shadow-md'
													href='/'
												>
													<div className='mt-4 mb-2 text-lg font-medium text-primary'>
														Documentation
													</div>
													<div className='text-sm leading-tight text-muted-foreground'>
														Learn how to integrate
														HavenTS Template into
														your project.
													</div>
												</div>
											</NavigationMenuLink>
										</li>
										<ListItem
											href='/docs/installation'
											title='Installation'
										>
											Step-by-step guide to get started
											with HavenTS
										</ListItem>
										<ListItem
											href='/docs/tutorials'
											title='Tutorials'
										>
											Interactive examples and tutorials
										</ListItem>
										<ListItem
											href='/docs/api-reference'
											title='API Reference'
										>
											Complete API documentation and
											references
										</ListItem>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link
										href='/about'
										className={navigationMenuTriggerStyle()}
									>
										About
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link
										href='/contact'
										className={navigationMenuTriggerStyle()}
									>
										Contact
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				{/* Right section - Theme toggle and Sign in */}
				<div className='flex items-center gap-4'>
					<ThemeToggle />
					<button className='hidden sm:inline-flex items-center justify-center h-9 rounded-full bg-primary/10 px-4 text-sm font-medium text-primary transition-colors hover:bg-primary/20 hover:shadow-sm'>
						<User className='h-4 w-4 mr-2' />
						Sign In
					</button>

					{/* Mobile menu button */}
					<button className='inline-flex md:hidden rounded-md p-2 text-muted-foreground hover:bg-accent'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='h-5 w-5'
						>
							<line
								x1='4'
								x2='20'
								y1='12'
								y2='12'
							/>
							<line
								x1='4'
								x2='20'
								y1='6'
								y2='6'
							/>
							<line
								x1='4'
								x2='20'
								y1='18'
								y2='18'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
