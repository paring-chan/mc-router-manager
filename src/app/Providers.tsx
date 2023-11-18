'use client'

import { NextUIProvider } from '@nextui-org/react'
import React, { PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'

export const Providers: React.FC<PropsWithChildren<{}>> = ({ children }) => (
	<NextUIProvider>
		<ThemeProvider attribute="class" defaultTheme="light">
			{children}
		</ThemeProvider>
	</NextUIProvider>
)
