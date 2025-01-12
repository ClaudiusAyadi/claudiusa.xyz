import { ClerkProvider } from '@clerk/nextjs';
import { ThemeModeScript } from 'flowbite-react';
import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from './components/Header';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

export const metadata = {
	title: 'NextJS Blog',
	description: 'A blog built with NextJS'
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider>
			<html lang='en' suppressHydrationWarning={true}>
				<head>
					<ThemeModeScript />
				</head>

				<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					<ThemeProvider>
						<Header />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
