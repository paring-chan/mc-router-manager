'use client'

import React, { useState } from 'react'
import { Server } from '@/utils/servers'
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Snippet,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
} from '@nextui-org/react'
import { TbArrowDown, TbEdit, TbTarget, TbTrash } from 'react-icons/tb'
import { addServer, removeServer } from '@/actions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export const ServerList: React.FC<{ servers: Server[] }> = ({ servers }) => {
	const [serverToDelete, setServerToDelete] = React.useState<Server | null>(
		null,
	)
	const [serverToEdit, setServerToEdit] = React.useState<Server | null>(null)
	const [processing, setProcessing] = useState(false)
	const [backend, setBackend] = React.useState('')

	const router = useRouter()

	React.useEffect(() => {
		setBackend(serverToEdit?.backend ?? '')
	}, [serverToEdit])

	return (
		<>
			<Modal isOpen={!!serverToDelete} onClose={() => setServerToDelete(null)}>
				<ModalContent>
					{(onClose) => (
						<form
							onSubmit={async (e) => {
								e.preventDefault()

								try {
									setProcessing(true)
									await removeServer(serverToDelete!.hostname)
									router.refresh()
									onClose()
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
							<ModalHeader>Remove server</ModalHeader>
							<ModalBody>
								Do you really want to remove this server?
								<div className="flex gap-4 items-center flex-col">
									<Snippet symbol="" color="primary" className="w-full">
										{serverToDelete?.hostname}
									</Snippet>
									<TbArrowDown />
									<Snippet symbol="" color="secondary" className="w-full">
										{serverToDelete?.backend}
									</Snippet>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									isDisabled={processing}
									color="primary"
									variant="flat"
									onPress={onClose}
								>
									Close
								</Button>
								<Button isLoading={processing} color="danger" type="submit">
									Delete server
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
			<Modal isOpen={!!serverToEdit} onClose={() => setServerToEdit(null)}>
				<ModalContent>
					{(onClose) => (
						<form
							onSubmit={async (e) => {
								e.preventDefault()

								try {
									setProcessing(true)
									await addServer(serverToEdit!.hostname, backend)
									router.refresh()
									onClose()
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
							<ModalHeader>Edit server</ModalHeader>
							<ModalBody>
								Editing server:
								<div className="flex gap-4 items-center flex-col">
									<Snippet symbol="" color="primary" className="w-full">
										{serverToEdit?.hostname}
									</Snippet>
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
								</div>
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
									Edit server
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
			<Table className="mt-4" aria-label="Servers">
				<TableHeader>
					<TableColumn>Hostname</TableColumn>
					<TableColumn>Backend</TableColumn>
					<TableColumn className="text-right w-0">Actions</TableColumn>
				</TableHeader>
				<TableBody>
					{servers.map((x, i) => (
						<TableRow key={i}>
							<TableCell className="pl-0 pr-2 pb-0">
								<div>
									<Snippet symbol="" color="primary" className="w-full">
										{x.hostname}
									</Snippet>
								</div>
							</TableCell>
							<TableCell className="pb-0">
								<div>
									<Snippet symbol="" color="secondary" className="w-full">
										{x.backend}
									</Snippet>
								</div>
							</TableCell>
							<TableCell className="pb-0">
								<div className="flex justify-center gap-4">
									<Tooltip content="Edit">
										<span
											className="text-lg transition-opacity opacity-75 hover:opacity-100 cursor-pointer active"
											onClick={() => setServerToEdit(x)}
										>
											<TbEdit />
										</span>
									</Tooltip>
									<Tooltip content="Delete">
										<span
											className="text-lg transition-colors text-red-400 hover:text-red-500 cursor-pointer active"
											onClick={() => setServerToDelete(x)}
										>
											<TbTrash />
										</span>
									</Tooltip>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
