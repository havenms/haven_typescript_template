import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
	CardDescription,
} from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/sonner';
import {
	CheckIcon,
	CoffeeIcon,
	PaletteIcon,
	LayoutGridIcon,
	SmileIcon,
} from 'lucide-react';

export default function Home() {
	return (
		<div className='min-h-screen bg-background'>
			<header className='px-8 py-6 flex items-center justify-between border-b shadow-subtle'>
				<h1 className='text-2xl font-bold text-primary'>
					HavenTS Template
				</h1>
				<ThemeToggle />
			</header>

			<main className='container mx-auto py-12 px-4 md:px-6'>
				{/* Hero Section */}
				<div className='mb-16 text-center'>
					<h2 className='text-4xl md:text-5xl font-bold mb-6'>
						<span className='text-primary'>Beautiful</span> UI
						Components
					</h2>
					<p className='text-xl mb-8 text-muted-foreground max-w-2xl mx-auto'>
						A delightful TypeScript template with shadcn goodness
						baked in, served with a side of mid-century modern
						style.
					</p>
					<div className='flex gap-4 justify-center'>
						<Button
							size='lg'
							className='rounded-full transition-shadow hover:shadow-elevation-1'
						>
							Explore Components
						</Button>
						<Button
							size='lg'
							variant='outline'
							className='rounded-full transition-shadow hover:shadow-elevation-1'
						>
							Read Docs
						</Button>
					</div>
				</div>

				{/* Button Showcase */}
				<div className='mb-16'>
					<h3 className='text-2xl font-semibold mb-6'>
						Button Varieties
					</h3>
					<div className='flex flex-wrap gap-4'>
						<Button className='transition-shadow hover:shadow-subtle'>
							Default
						</Button>
						<Button
							variant='secondary'
							className='transition-shadow hover:shadow-subtle'
						>
							Secondary
						</Button>
						<Button
							variant='destructive'
							className='transition-shadow hover:shadow-subtle'
						>
							Destructive
						</Button>
						<Button
							variant='outline'
							className='transition-shadow hover:shadow-subtle'
						>
							Outline
						</Button>
						<Button
							variant='ghost'
							className='transition-shadow hover:shadow-subtle'
						>
							Ghost
						</Button>
						<Button variant='link'>Link Button</Button>
					</div>
				</div>

				{/* Card Showcase */}
				<h3 className='text-2xl font-semibold mb-6'>Card Components</h3>
				<div className='grid md:grid-cols-3 gap-6 mb-16'>
					<Card className='transition-all hover:shadow-elevation-2'>
						<CardHeader>
							<CardTitle className='text-secondary'>
								<CoffeeIcon className='inline-block mr-2 h-5 w-5' />
								Coffee Break
							</CardTitle>
							<CardDescription>
								Essential developer fuel
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								This component is perfect for those moments when
								you need to step away from debugging that
								impossible error.
							</p>
						</CardContent>
						<CardFooter>
							<Button
								size='sm'
								className='transition-shadow hover:shadow-subtle'
							>
								Brew Some
							</Button>
						</CardFooter>
					</Card>

					<Card className='transition-all hover:shadow-elevation-2'>
						<CardHeader>
							<CardTitle className='text-primary'>
								<PaletteIcon className='inline-block mr-2 h-5 w-5' />
								Color Schemes
							</CardTitle>
							<CardDescription>
								Customizable themes
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								Toggle between light and dark mode to see how
								our components gracefully adapt to your
								preferred style.
							</p>
							<div className='mt-4'>
								<Progress
									value={68}
									className='h-2'
								/>
							</div>
						</CardContent>
						<CardFooter className='flex justify-between'>
							<Button
								size='sm'
								variant='outline'
								className='transition-shadow hover:shadow-subtle'
							>
								Reset
							</Button>
							<Button
								size='sm'
								className='transition-shadow hover:shadow-subtle'
							>
								Apply
							</Button>
						</CardFooter>
					</Card>

					<Card className='transition-all hover:shadow-elevation-2'>
						<CardHeader>
							<CardTitle className='text-accent'>
								<SmileIcon className='inline-block mr-2 h-5 w-5' />
								Fun Factor
							</CardTitle>
							<CardDescription>
								Developer happiness metrics
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								Studies show that using beautiful UI components
								increases developer satisfaction by 42% and
								decreases keyboard smashing by 67%.
							</p>
						</CardContent>
						<CardFooter>
							<Button
								size='sm'
								variant='secondary'
								className='transition-shadow hover:shadow-subtle'
							>
								Learn More
							</Button>
						</CardFooter>
					</Card>
				</div>

				{/* Form Elements */}
				<div className='mb-16'>
					<h3 className='text-2xl font-semibold mb-6'>
						Form Components
					</h3>
					<Card className='shadow-elevation-1'>
						<CardContent className='pt-6'>
							<div className='grid gap-6'>
								<div className='grid gap-2'>
									<Label htmlFor='name'>Name</Label>
									<Input
										id='name'
										placeholder='Enter your name'
										className='transition-shadow focus-visible:shadow-subtle'
									/>
								</div>

								<div className='grid gap-2'>
									<Label htmlFor='framework'>
										Favorite Framework
									</Label>
									<Select>
										<SelectTrigger
											id='framework'
											className='transition-shadow hover:shadow-subtle'
										>
											<SelectValue placeholder='Select a framework' />
										</SelectTrigger>
										<SelectContent className='shadow-elevation-2'>
											<SelectItem value='next'>
												Next.js
											</SelectItem>
											<SelectItem value='react'>
												React
											</SelectItem>
											<SelectItem value='vue'>
												Vue
											</SelectItem>
											<SelectItem value='svelte'>
												Svelte
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className='flex items-center gap-4'>
									<Label>Toggle Features</Label>
									<Toggle
										aria-label='Toggle dark mode'
										className='transition-shadow hover:shadow-subtle'
									>
										<CoffeeIcon className='h-4 w-4' />
										Coffee Mode
									</Toggle>
									<Toggle
										aria-label='Toggle italic'
										className='transition-shadow hover:shadow-subtle'
									>
										<LayoutGridIcon className='h-4 w-4' />
										Grid View
									</Toggle>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Mid-century design element */}
				<div className='py-16 flex justify-center'>
					<div className='w-32 h-1 bg-secondary shadow-subtle'></div>
				</div>

				{/* Call to action */}
				<div className='bg-accent/10 p-8 rounded-lg text-center mb-16 shadow-elevation-2'>
					<h3 className='text-2xl md:text-3xl font-bold mb-4'>
						Ready to build something amazing?
					</h3>
					<p className='mb-6 max-w-xl mx-auto'>
						This template is ready to help you create beautiful,
						responsive, and accessible web applications.
					</p>
					<Button
						className='rounded-full transition-shadow hover:shadow-elevation-1'
						size='lg'
					>
						Use This Template
					</Button>
				</div>
			</main>

			<footer className='bg-muted py-8 px-4 shadow-elevation-1'>
				<div className='container mx-auto text-center text-muted-foreground'>
					<p>
						&copy; {new Date().getFullYear()} HavenTS Template. Made
						with ❤️ for developers.
					</p>
				</div>
			</footer>
			<Toaster />
		</div>
	);
}
