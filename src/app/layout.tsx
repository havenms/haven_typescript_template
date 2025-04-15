import { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
// If you use Google Fonts instead:
import { Noto_Sans } from 'next/font/google';

const fontDuployan = Noto_Sans({
	subsets: ['latin'],
	variable: '--font-duployan',
});

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'HavenTS Template',
	description: 'A TypeScript template with shadcn components',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className='scroll-smooth'
		>
			<head />
			<body
				className={cn(
					'min-h-screen font-body antialiased bg-gradient-to-b from-background to-background/95 selection:bg-primary/20 selection:text-primary-foreground',
					fontSans.variable,
					fontDuployan.variable
				)}
			>
				{/* Visual background decoration */}
				<div className='fixed inset-0 z-[-1] bg-background/50'>
					<div className='absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]' />
					<div className='absolute -top-24 -right-24 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl dark:bg-primary/10' />
					<div className='absolute -bottom-24 -left-24 h-[250px] w-[250px] rounded-full bg-secondary/5 blur-3xl dark:bg-secondary/10' />
				</div>

				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<div className='relative z-10 flex min-h-screen flex-col'>
						{children}
					</div>
				</ThemeProvider>

				{/* Animated gradient border on theme toggle */}
				<div
					className='fixed inset-0 z-[-2] pointer-events-none border border-transparent transition-all duration-1000 data-[theme-transitioning=true]:border-primary/10'
					data-theme-border
				/>
			</body>
		</html>
	);
}
