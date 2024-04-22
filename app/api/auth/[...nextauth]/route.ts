import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import {createUser, getUserByEmail} from "@/lib/db/db-helpers";
import mongoose from "mongoose";
import mongooseConnection from "@/lib/db/mongoose-connection";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        // @ts-ignore
        async signIn({user, account}) {
            if (account.provider === "google") {

                const {email, name} = user

                if (mongoose.connection.readyState !== mongoose.STATES.connected) {
                    await mongooseConnection
                }

                const existingUser = await getUserByEmail(email)

                if (existingUser) {
                    return {...existingUser, id: existingUser._id}
                }

                try {
                    const res = await createUser(user)

                    if (!!res) {
                        const newUser = res.data

                        return {...user, id: newUser._id}
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        },
        // @ts-ignore
        async jwt({token}) {
            // TODO fix user id propagation
            // not the most performant way to do this, but necessary since no other way to get userid was found.
            // the problem is that token.sub is the google user id (?), not the user id in the database
            const user = await getUserByEmail(token.email)
            token.id = user?._id
            console.log("queried mongodb for id")
            return token
        },
        // @ts-ignore
        session({session, token}) {
            session.id = token.id
            return session
        },
    }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
