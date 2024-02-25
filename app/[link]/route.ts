import { client } from "../db"

const links: Array<Links> = [
	{
		href: "erik",
		original: "https://erik.pages.dev",
	},
]

export async function GET(request: Request, { params }: { params: { link: string } }) {
	/*await client.execute(`CREATE TABLE IF NOT EXISTS links (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		href VARCHAR(16),
		original VARCHAR(75)
  	)`)*/
	const link = params.link
	if (!link) return Response.redirect("/")

	const { rows }: { rows: any } = await client.execute({
		sql: "SELECT * FROM links WHERE href = ?",
		args: [link],
	})

	const originalLink = getOriginalLink(links, "erik")?.original!
	if (!originalLink) return Response.redirect("/")

	return Response.redirect(rows[0].original)
}

const getOriginalLink = (links: Array<Links>, query: string): Links | null => {
	// Search requested link.
	const link: Links | 0 = links.find((link) => link.href === query) || 0

	if (!link) return null

	return {
		href: link.href,
		original: link.original,
	}
}

type Links = {
	href: string
	original: string
}
