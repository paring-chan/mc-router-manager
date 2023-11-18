'use client'

import React from 'react'
import { Button, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { TbBrightnessDown, TbMoon } from 'react-icons/tb'

export const Nav: React.FC = () => {
	const { theme, setTheme } = useTheme()

	const [mounted, setMounted] = React.useState(false)
	React.useEffect(() => setMounted(true), [])

	return (
		<Navbar>
			<NavbarBrand>
				<p className="font-bold text-inherit">
					Minecraft Server Router Manager
				</p>
			</NavbarBrand>
			<NavbarContent justify="end">
				{mounted && (
					<Button
						isIconOnly
						color="primary"
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					>
						{theme === 'dark' ? <TbBrightnessDown /> : <TbMoon />}
					</Button>
				)}
			</NavbarContent>
		</Navbar>
	)
}
