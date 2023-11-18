'use server'

import { api } from '@/utils/api'

export async function addServer(host: string, backend: string) {
	await api.post('/routes', {
		serverAddress: host,
		backend: backend,
	})
}

export async function removeServer(host: string) {
	await api.delete(`/routes/${encodeURIComponent(host)}`)
}
