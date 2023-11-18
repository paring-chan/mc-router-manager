export interface Server {
	hostname: string
	backend: string
}

export const objectToServers = (obj: Record<string, string>): Server[] =>
	Object.entries(obj).map(([a, b]) => ({
		hostname: a,
		backend: b,
	}))
