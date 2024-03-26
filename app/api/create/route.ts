import { client } from "../../db"

export async function POST(request: Request, { params }: { params: { link: string } }) {
	const formData = await request.formData()
	const href = formData.get("href")?.toString() || ""
	const original = formData.get("original")?.toString() || ""

	if (!href || !original) return Response.json({ error: "500" })
	if (href.length > 20 || original.length > 60) return Response.json({ message: "Link is already in use", error: "403" })

	if (!original.toString().startsWith("https://")) return Response.redirect("/")

	const { rows } = await client.execute({
		sql: `SELECT href, original 
		FROM links 
		WHERE href = ?`,
		args: [href],
	})
	console.log(rows)

	if (rows.length !== 0) return Response.json({ error: "500" })
	console.log(original)

	await client.execute({
		sql: "INSERT INTO links (href, original) VALUES (?, ?)",
		args: [href, original],
	})

	return Response.json({ error: "200" })
}
