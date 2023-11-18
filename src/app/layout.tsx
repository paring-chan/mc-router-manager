import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import { Providers } from '@/app/Providers'
import { Nav } from '@/components/Nav'
import { Link } from '@nextui-org/react'
import packageJSON from '../../package.json'

import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Minecraft Router Manager',
	description: 'web ui for itzg/mc-router',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers>
					<Nav />
					<main className="mx-auto max-w-[1024px] px-6 mt-4">{children}</main>
					<footer className="mx-auto max-w-[1024px] px-6 my-4 flex justify-between">
						<div className="text-gray-500 font-light">
							Based on{' '}
							<Link
								target="_blank"
								rel="noreferrer"
								href="https://github.com/itzg/mc-router"
							>
								mc-router
							</Link>
						</div>
						<div className="text-gray-500 font-light">
							v{packageJSON.version}
						</div>
						<div className="text-gray-500 font-light">
							Made by{' '}
							<Link
								target="_blank"
								rel="noreferrer"
								href="https://github.com/pikokr"
							>
								paring
							</Link>
						</div>
					</footer>
				</Providers>
			</body>
		</html>
	)
}
