import { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
// If you use Google Fonts instead:
import { Noto_Sans } from 'next/font/google'
const fontDuployan = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-duployan',
})

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
		>
			<head />
			<body
				className={cn(
					'min-h-screen bg-background font-body antialiased',
					fontSans.variable,
					fontDuployan.variable
				)}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
