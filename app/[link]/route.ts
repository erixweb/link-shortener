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
		sql: "SELECT (href, original) FROM links WHERE href = ?",
		args: [link],
	})

	if (!rows) return Response.redirect("/")

	return Response.redirect(rows[0].original)
}

type Links = {
	href: string
	original: string
}
