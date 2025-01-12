'use client';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { dark, light } from '@clerk/themes';
import { Button, Navbar, TextInput } from 'flowbite-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';

const links = [
	{
		url: '/',
		label: 'Home'
	},
	{
		url: '/about',
		label: 'About'
	},
	{
		url: '/projects',
		label: 'Projects'
	}
];

export default function Header() {
	const path = usePathname();
	const { theme, setTheme } = useTheme();
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState('');
	const searchParams = useSearchParams();

	const handleSubmit = e => {
		e.preventDefault();
		const urlParams = new URLSearchParams(searchParams);
		urlParams.set('searchTerm', searchTerm);
		const searchQuery = urlParams.toString();
		router.push(`/search?${searchQuery}`);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(searchParams);
		const searchTermFromUrl = urlParams.get('searchTerm');
		if (searchTermFromUrl) {
			setSearchTerm(searchTermFromUrl);
		}
	}, [searchParams]);
	return (
		<Navbar className='border-b-2'>
			<Link href='/' className='font-semibold text-sm sm:text-xl dark:text-white whitespace-nowrap self-center'>
				<span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 py-1 rounded-lg text-white'>Sahand&apos;s</span>
				Blog
			</Link>
			<form onSubmit={handleSubmit}>
				<TextInput
					type='text'
					placeholder='Search...'
					rightIcon={AiOutlineSearch}
					className='lg:inline hidden'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</form>
			<Button className='lg:hidden w-12 h-10' color='gray' pill>
				<AiOutlineSearch />
			</Button>
			<div className='flex gap-2 md:order-2'>
				<Button className='sm:inline hidden w-12 h-10' color='gray' pill onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
					{theme === 'light' ? <FaSun /> : <FaMoon />}
				</Button>
				<SignedIn>
					<UserButton
						appearance={{
							baseTheme: theme === 'light' ? light : dark
						}}
						userProfileUrl='/dashboard?tab=profile'
					/>
				</SignedIn>
				<SignedOut>
					<Link href='/sign-in'>
						<Button gradientDuoTone='purpleToBlue' outline>
							Sign In
						</Button>
					</Link>
				</SignedOut>
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				<Link href='/'>
					<Navbar.Link active={path === '/'} as={'div'}>
						Home
					</Navbar.Link>
				</Link>
				<Link href='/about'>
					<Navbar.Link active={path === '/about'} as={'div'}>
						About
					</Navbar.Link>
				</Link>
				<Link href='/projects'>
					<Navbar.Link active={path === '/projects'} as={'div'}>
						Projects
					</Navbar.Link>
				</Link>
			</Navbar.Collapse>
		</Navbar>
	);
}
