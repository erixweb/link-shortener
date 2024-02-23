import { createClient } from "@libsql/client"

export const client = createClient({
	url: "libsql://link-shortener-erixweb.turso.io",
	authToken: process.env.DB_TOKEN,
})
