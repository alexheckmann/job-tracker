import {DefaultSession} from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session extends DefaultSession {
        user: {
            roles: string[],
            locations: string[],
        } & DefaultSession["user"]
        id: string,
        keywords: string[],
    }
}
