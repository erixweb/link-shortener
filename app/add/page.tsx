"use client"

export default function AddPage() {
	return (
		<form action="/api/create" method="POST">
			<input type="text" name="href" />
			<input type="text" name="original" />
			<button>submit</button>
		</form>
	)
}
