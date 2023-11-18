'use client'

import React from 'react'
import { Server } from '@/utils/servers'
import {
	Snippet,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
} from '@nextui-org/react'
import { TbTrash } from 'react-icons/tb'

export const ServerList: React.FC<{ servers: Server[] }> = ({ servers }) => {
	return (
		<Table className="mt-4">
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
							<div className="flex justify-center">
								<Tooltip content="Delete">
									<span className="text-lg transition-colors text-red-400 hover:text-red-500 cursor-pointer active">
										<TbTrash />
									</span>
								</Tooltip>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
