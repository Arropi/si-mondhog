import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      role?: string
      accessToken?: string
      id?: string
    } & DefaultSession["user"]
  }

  interface User {
      role?: string
      accessToken?: string
      id?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    accessToken?: string
    id?: string
  }
}
