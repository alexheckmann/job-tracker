import {decrypt} from "@/lib/security/decrypt";
import {generateKey} from "@/lib/security/generateKey";
import {getInitializationVector} from "@/lib/security/getInitializationVector";

/**
 * Decrypts a key using the user's googleId
 * @param encryptedKey The key to decrypt
 * @param googleId The user's googleId
 */
export function decryptKey(encryptedKey: string, googleId: string): Buffer {
    const key2 = generateKey(googleId);
    const iv = getInitializationVector(googleId);
    const key1 = decrypt(encryptedKey, key2, iv);
    return Buffer.from(key1, 'hex');
}
