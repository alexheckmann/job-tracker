import {User} from "@/lib/models/user";
import {UserModel} from "@/lib/db/user-model";
import {cache} from "react";
import {decryptKey} from "@/lib/security/decryptKey";
import {decryptUser} from "@/lib/security/decrypt";
import {getInitializationVector} from "@/lib/security/getInitializationVector";

/**
 * Create a user in the database
 * @param user The user to create
 * @returns user The created user
 */
export function createUser(user: User) {
    user.roles = []
    user.locations = []
    user.keywords = []

    return UserModel.create<User>(user)
}

/**
 * Get the user with the given email from the database. This function is not cached.
 * @param email The email of the user to get
 * @returns user the user with the given email
 */
export function uncachedGetUserByEmail(email: string) {
    return UserModel.findOne<User>({email}).exec()
}

/**
 * Get the user with the given email from the database. This function is cached.
 * @param email The email of the user to get
 * @returns uncachedGetUserByEmail(email) the user with the given email
 */
export const getUserByEmail: (email: string) => Promise<User | null> = cache(async (email: string) => {
    return await uncachedGetUserByEmail(email)
})

/**
 * Get the user with the given id from the database
 * @param id The id of the user to get
 * @returns user The user with the given id
 */
export function getUserById(id: string): Promise<User | null> {
    const user = UserModel.findById<User>(id).exec()

    if (!user) {
        console.log(`User not found: ${id}`)
    }

    return user
}

/**
 * Get the user with the given id from the database and decrypt the user.
 * @param id The id of the user to get
 * @param encryptedKey The encrypted key
 * @param googleId The google id of the user to get the decrypted key and initialization vector
 * @returns user The user with the given id, decrypted
 */
export function getUserByIdDecrypted(id: string, encryptedKey: string, googleId: string): Promise<User> {
    const decryptedKey = decryptKey(encryptedKey, googleId)

    return getUserById(id)
        // @ts-ignore
        .then((user) => user!.toObject())
        .then((user) => decryptUser(user, decryptedKey, getInitializationVector(googleId)))
}

/**
 * Update a user in the database
 * @param id The id of the user to update
 * @param user The updated user
 */
export function updateUser(id: string, user: Partial<User>) {
    return UserModel.findByIdAndUpdate<User>(id, user, {new: true}).exec()
}
