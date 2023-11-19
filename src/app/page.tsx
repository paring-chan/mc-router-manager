import React from 'react'
import { Card, CardBody } from '@nextui-org/card'
import { TbAlertCircle } from 'react-icons/tb'
import { api } from '@/utils/api'
import { objectToServers } from '@/utils/servers'
import { ServerList } from '@/components/ServerList'
import { ServerCreateButton } from '@/components/ServerCreateButton'
import { DefaultServerEdit } from '@/components/DefaultServerEdit'

export const dynamic = 'force-dynamic'

export default async function Home() {
	const servers = await api.get('/routes').then((x) => objectToServers(x.data))

	return (
		<>
			<div className="flex justify-end items-center">
				<div className="flex-grow font-bold text-xl">Servers</div>
				<ServerCreateButton />
			</div>
			{servers.length == 0 ? (
				<Card className="mt-4">
					<CardBody>
						<div className="flex flex-col items-center py-8">
							<TbAlertCircle className="text-4xl text-blue-500" />
							<p className="mt-4 text-2xl">
								{' '}
								There{"'"}s no servers registered.
							</p>
						</div>
					</CardBody>
				</Card>
			) : (
				<ServerList servers={servers} />
			)}
			<DefaultServerEdit />
		</>
	)
}
