import crypto from "crypto";
import {cache} from "react";

/**
 * Generates an initialization vector based the user's googleId. The googleId is hashed using sha256 and the first 16 bytes
 * are used as the initialization vector.
 * The googleId is used since it is unique to the user, it never changes, is not stored in the database and is only available within the
 * token context between Google and the token requests.
 * @param googleId
 */
export function generateInitializationVector(googleId: string): Buffer {
    const hash = crypto.createHash("sha256").update(googleId, "utf8").digest()
    return hash.subarray(0, 16)
}

/**
 * Gets the initialization vector based on the user's googleId from the cache.
 * @see generateInitializationVector
 */
export const getInitializationVector = cache(generateInitializationVector)
