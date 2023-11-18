import Axios from 'axios'

export const api = Axios.create({
	baseURL: process.env.API_URL,
	headers: {
		Accept: 'application/json',
	},
})
