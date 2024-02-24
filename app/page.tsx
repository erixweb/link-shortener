import { getServerSession } from "next-auth/next"
import SignIn from "./components/signin"
import { authOptions } from "./api/auth/signin/github/[...nextauth]/route"

export default async function Home() {
	const session = await getServerSession(authOptions)

	if (session) {
		console.log(session)
	} else {
		console.log("No session")
	}
	return (
		<>
			<header className="w-full h-[100vh] flex flex-col items-center justify-center animate-fade-in duration-[400ms]">
				<div>
					<h1 className="text-center font-bold text-[60px]">Link Shortener</h1>
					<p className="text-center">Create unlimited & custom URLS</p>
				</div>
				<div className="py-[20px] flex gap-[20px]">
					<SignIn />
					<a
						href="/"
						className=" bg-slate-950 text-white px-[16px] py-[8px] rounded-[7px]"
					>
						Github repo
					</a>
				</div>
			</header>
		</>
	)
}
