import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import mongooseConnection from "@/lib/db/mongoose-connection";
import {generateKey} from "@/lib/security/generateKey";
import {encrypt} from "@/lib/security/encrypt";
import {getInitializationVector} from "@/lib/security/getInitializationVector";
import {decryptKey} from "@/lib/security/decryptKey";
import {decryptUser} from "@/lib/security/decrypt";
import {createUser, getUserByEmail} from "@/lib/db/user-model-helpers";

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

                const {email} = user

                if (mongoose.connection.readyState !== mongoose.STATES.connected) {
                    await mongooseConnection
                }

                const existingUser = await getUserByEmail(email)
                    // @ts-ignore
                    .then((user) => user?.toObject())

                if (existingUser) {
                    const decryptedKey = decryptKey(existingUser.encryptedKey!, account.providerAccountId)
                    const decryptedUser = decryptUser(existingUser, decryptedKey, getInitializationVector(account.providerAccountId))

                    return {...decryptedUser, id: decryptedUser._id}
                }

                try {

                    // generate key1 based on the user's email
                    const key1 = generateKey(user.email)

                    // generate key2 based on the user's googleId
                    const key2 = generateKey(account.providerAccountId)

                    // generate initialization vector based on the user's googleId
                    const iv = getInitializationVector(account.providerAccountId)

                    const encryptedKey = encrypt(key1.toString("hex"), key2, iv)

                    const res = await createUser({...user, encryptedKey: encryptedKey})

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
                // @ts-ignore
                .then((user) => user?.toObject())
                .then((user) => {
                    const decryptedKey = decryptKey(user.encryptedKey, token.sub)
                    return decryptUser(user, decryptedKey, getInitializationVector(token.sub))
                })
            // passing the user id to the token, so it can be used in the session
            token.id = user?._id
            token.roles = user?.roles
            token.locations = user?.locations
            token.keywords = user?.keywords
            token.encryptedKey = user?.encryptedKey
            return token
        },
        // @ts-ignore
        session({session, token}) {
            session.user.id = token.id
            session.user.roles = token.roles
            session.user.locations = token.locations
            session.user.keywords = token.keywords
            session.user.encryptedKey = token.encryptedKey
            session.googleId = token.sub
            return session
        },
    }
}
