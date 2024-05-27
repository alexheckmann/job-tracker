import {DefaultSession} from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session extends DefaultSession {
        user: {
            roles: string[],
        } & DefaultSession["user"]
        id: string,
        roles: string[],
        locations: string[],
        keywords: string[],
    }
}
