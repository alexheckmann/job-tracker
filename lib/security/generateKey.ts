import crypto from "crypto";

/**
 * Generates a salt based on the user's googleId. The googleId is hashed using sha256 and the first 16 bytes
 * are used as the salt.
 * @param sourceString A string to generate the salt from
 * @returns salt The generated salt
 */
function generateSalt(sourceString: string): Buffer {
    // Create a hash of the sourceString
    const hash = crypto.createHash('sha256').update(sourceString, 'utf8').digest();

    // Use the first 16 bytes of the hash as the salt
    return hash.subarray(0, 16);
}

/**
 * Generates a key based on the source string, either the user's email or googleId.
 * The googleId is hashed using sha512 and the key is generated using pbkdf2Sync
 * with the hashed source string as the password and a salt generated from the source string.
 * @param sourceString A string to generate the key from
 */
export function generateKey(sourceString: string): Buffer {
    const salt = generateSalt(sourceString)

    return crypto.pbkdf2Sync(sourceString, salt, 500000, 32, "sha512")
}


