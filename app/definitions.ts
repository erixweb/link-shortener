import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"


export const authOptions: NextAuthOptions = {
	secret: process.env.AUTH_SECRET,
	jwt: {
		secret: process.env.AUTH_SECRET,
	},
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
	],
}