import crypto from "crypto";
import {Job} from "@/lib/models/job";
import {cache} from "react";
import {transformObjectStringProperties} from "@/lib/security/transformObjectStringProperties";
import {User} from "@/lib/models/user";

/**
 * Decrypts string data using aes-256-cbc.
 * @param encrypted The encrypted data
 * @param key The key to decrypt the data
 * @param iv The initialization vector
 */
export function decrypt(encrypted: string, key: Buffer, iv: Buffer): string {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

/**
 * Caches the decrypt function to avoid re-creating the decipher object.
 */
const cachedDecrypt = cache(decrypt)

/**
 * Decrypts the string properties of an object using the provided key and initialization vector.
 * @param obj The object to decrypt
 * @param key The key to use for decryption
 * @param iv The initialization vector to use for decryption
 * @param excludeProps The properties to exclude from decryption
 */
export function decryptObject<T extends Record<string, unknown>>(obj: any, key: Buffer, iv: Buffer, excludeProps: string[] = []): T {
    return transformObjectStringProperties<T>(obj, (data: string) => cachedDecrypt(data, key, iv), excludeProps);
}

/**
 * Decrypts the user object using the provided key and initialization vector.
 * @param user The user to decrypt
 * @param key The key to use for decryption
 * @param iv The initialization vector to use for decryption
 * @param excludeProps The properties to exclude from decryption
 */
export function decryptUser(user: User, key: Buffer, iv: Buffer, excludeProps: string[] = []): User {
    return decryptObject<User>(user, key, iv, excludeProps);
}

/**
 * Decrypts the job object using the provided key and initialization vector.
 * @param job The job to decrypt
 * @param key The key to use for decryption
 * @param iv The initialization vector to use for decryption
 * @param excludeProps The properties to exclude from decryption
 */
export function decryptJob(job: Job, key: Buffer, iv: Buffer, excludeProps: string[] = []): Job {
    return decryptObject<Job>(job, key, iv, excludeProps);
}
