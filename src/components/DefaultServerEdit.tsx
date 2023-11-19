'use client'

import React from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Button, Input } from '@nextui-org/react'
import { TbCheck, TbPencil, TbTarget } from 'react-icons/tb'
import { toast } from 'react-toastify'
import { setDefaultServer } from '@/actions'

export const DefaultServerEdit: React.FC = () => {
	const [processing, setProcessing] = React.useState(false)
	const [backend, setBackend] = React.useState('')
	const [success, setSuccess] = React.useState(false)

	const timeoutRef = React.useRef<number>(null)

	const markSuccess = () => {
		if (timeoutRef.current != null) clearTimeout(timeoutRef.current)
		setSuccess(true)
		// @ts-expect-error typing
		timeoutRef.current = setTimeout(() => {
			setSuccess(false)
		}, 5000) as unknown as number
	}

	return (
		<Card className="mt-4">
			<CardHeader>Default Server</CardHeader>
			<CardBody
				as="form"
				onSubmit={async (e) => {
					e.preventDefault()
					setSuccess(false)
					setProcessing(true)
					try {
						markSuccess()
						await setDefaultServer(backend)
					} catch (e) {
						toast.error((e as Error).message)
					} finally {
						setProcessing(false)
					}
				}}
			>
				<Input
					disabled={processing}
					label="Backend address"
					endContent={<TbTarget />}
					placeholder="127.0.0.1:12345"
					variant="bordered"
					value={backend}
					onChange={(e) => setBackend(e.target.value)}
				/>
				<Button
					startContent={success ? <TbCheck /> : <TbPencil />}
					color={success ? 'success' : 'primary'}
					size="lg"
					className="mt-4"
					type="submit"
				>
					<h4 className="font-bold">Set Default Server</h4>
				</Button>
			</CardBody>
		</Card>
	)
}
