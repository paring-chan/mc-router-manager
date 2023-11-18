'use client'

import { NextUIProvider } from '@nextui-org/react'
import React, { PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'

export const Providers: React.FC<PropsWithChildren<{}>> = ({ children }) => (
	<NextUIProvider>
		<ToastContainer position="top-right" />
		<ThemeProvider attribute="class" defaultTheme="light">
			{children}
		</ThemeProvider>
	</NextUIProvider>
)
