import { client } from "../../db"

export async function POST(request: Request, { params }: { params: { link: string } }) {
	const formData = await request.formData()
	const href = formData.get("href")?.toString() || ""
	const original = formData.get("original")?.toString() || ""

	if (!href || !original) return Response.json({ error: "500" })
	if (href.length > 20 || original.length > 60) return Response.json({ error: "500" })

	if (!original.toString().startsWith("https://")) return Response.redirect("/")
	const { rows }: { rows: any } = await client.execute({
		sql: "SELECT * FROM links WHERE href = ?",
		args: [href],
	})

	if (rows.length !== 0) return Response.json({ error: "500" })
	console.log(original)

	await client.execute({
		sql: "INSERT INTO links (href, original) VALUES (?, ?)",
		args: [href, original],
	})

	return Response.json({ error: "200" })
}
