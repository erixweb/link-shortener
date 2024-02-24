"use client"

import { signIn } from "next-auth/react"

export default function SignIn() {
	return (
		<button
			onClick={() => signIn()}
			className=" bg-slate-950 text-white px-[16px] py-[8px] rounded-[7px]"
		>
			Github repo
		</button>
	)
}
