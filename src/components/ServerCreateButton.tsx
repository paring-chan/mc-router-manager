'use client'

import React, { useState } from 'react'
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import { useFormStatus } from 'react-dom'
import { TbPlus, TbServer, TbTarget } from 'react-icons/tb'
import { addServer } from '@/actions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export const ServerCreateButton: React.FC = () => {
	const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()
	const [processing, setProcessing] = useState(false)
	const [host, setHost] = React.useState('')
	const [backend, setBackend] = React.useState('')

	const router = useRouter()

	return (
		<>
			<Button color="primary" onClick={onOpen} startContent={<TbPlus />}>
				Add
			</Button>
			<Modal
				isOpen={processing || isOpen}
				onOpenChange={onOpenChange}
				isDismissable={!processing}
			>
				<ModalContent>
					{(onClose) => (
						<form
							onSubmit={async (e) => {
								e.preventDefault()

								try {
									setProcessing(true)
									await addServer(host, backend)
									router.refresh()
									onClose()

									setHost('')
									setBackend('')
								} catch (e) {
									if (e instanceof Error) {
										toast.error(e.message)
									}
									throw e
								} finally {
									setProcessing(false)
								}
							}}
						>
							<ModalHeader>Add Server</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									isRequired
									disabled={processing}
									label="Hostname"
									endContent={<TbServer />}
									placeholder="something.example.com"
									variant="bordered"
									value={host}
									onChange={(e) => setHost(e.target.value)}
								/>
								<Input
									isRequired
									disabled={processing}
									label="Backend address"
									endContent={<TbTarget />}
									placeholder="127.0.0.1:12345"
									variant="bordered"
									value={backend}
									onChange={(e) => setBackend(e.target.value)}
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									isDisabled={processing}
									color="danger"
									variant="flat"
									onPress={onClose}
								>
									Close
								</Button>
								<Button isLoading={processing} color="primary" type="submit">
									Add Server
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
