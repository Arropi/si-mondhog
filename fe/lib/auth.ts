import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: "https://accounts.google.com/o/oauth2/auth?prompt=consent&access_type=offline&response_type=code"
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    jwt: {
        maxAge: 60 * 60 * 24
    },
    callbacks: {
        async signIn({ user }) {
            if (!user.email?.endsWith("mail.ugm.ac.id")) {
                return "/loginFailed";
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (account) {
                console.log("user nya: ", user.name, "dengan email: ", user.email)
                console.log(process.env.NEXT_PUBLIC_API_URL)
                const fetching = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: user.email,
                        username: user.name
                    }),
                })
                const result = await fetching.json()
                console.log("INI TOKENNYA LEK ====>", result?.token)
                token.role = result?.user?.role
                token.accessToken = result?.token
                token.id = result?.user?._id
                token.email = user.email
            }
            return token
        },
        async session({ session, token }) {
            session.user.role = token.role
            session.user.accessToken = token.accessToken
            session.user.id = token.id
            return session
        },
    },
    pages: {
        signIn: "/dashboard"
    }
}