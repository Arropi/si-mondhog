import { type DefaultSession } from "next-auth";

declare module "next-auth" {
    interface session {
        user: {
            id?: String
            role: String
            accessToken: string
        } & DefaultSession["user"]
    }

    interface User {
        role: String
        accessToken: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: String
        accessToken: string
    }
}