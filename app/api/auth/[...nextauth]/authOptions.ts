import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import mongooseConnection from "@/lib/db/mongoose-connection";
import {createUser, getUserByEmail} from "@/lib/db/db-helpers";

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
            // passing the user id to the token, so it can be used in the session
            token.id = user?._id
            token.roles = user?.roles
            token.locations = user?.locations
            token.keywords = user?.keywords
            return token
        },
        // @ts-ignore
        session({session, token}) {
            session.id = token.id
            session.user.roles = token.roles
            session.user.locations = token.locations
            session.user.keywords = token.keywords
            return session
        },
    }
}
