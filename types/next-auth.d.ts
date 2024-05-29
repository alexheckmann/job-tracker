import {DefaultSession} from "next-auth"
import {UserCompanies} from "@/lib/models/user";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session extends DefaultSession {
        user: {
            id: string,
            roles: string[],
            locations: string[],
            keywords: string[],
            companies: UserCompanies[]
        } & DefaultSession["user"]
    }
}
