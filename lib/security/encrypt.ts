import {cache} from "react";
import {User} from "@/lib/models/user";
import {Job} from "@/lib/models/job";
import crypto from "crypto";
import {transformObjectStringProperties} from "@/lib/security/transformObjectStringProperties";

/**
 * Encrypts string data using aes-256-cbc.
 * @param data The data to encrypt
 * @param key The key to encrypt the data
 * @param iv The initialization vector
 */
export function encrypt(data: string, key: Buffer, iv: Buffer): string {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

/**
 * Caches the encrypt function to avoid re-creating the cipher object.
 */
const cachedEncrypt = cache(encrypt)

/**
 * Encrypts the string properties of an object using the provided key and initialization vector.
 * @param obj The object to encrypt
 * @param key The key to use for encryption
 * @param iv The initialization vector to use for encryption
 * @param excludeProps The properties to exclude from encryption
 */
export function encryptObject<T extends Record<string, unknown>>(obj: T, key: Buffer, iv: Buffer, excludeProps: string[] = []): T {
    return transformObjectStringProperties<T>(obj, (data: string) => cachedEncrypt(data, key, iv), excludeProps);
}

/**
 * Encrypts the user object using the provided key and initialization vector.
 * @param user The user to encrypt
 * @param key The key to use for encryption
 * @param iv The initialization vector to use for encryption
 * @param excludeProps The properties to exclude from encryption
 */
export function encryptUser(user: User, key: Buffer, iv: Buffer, excludeProps: string[] = []): User {
    return encryptObject<User>(user, key, iv, excludeProps);
}

/**
 * Encrypts the job object using the provided key and initialization vector.
 * @param job The job to encrypt
 * @param key The key to use for encryption
 * @param iv The initialization vector to use for encryption
 * @param excludeProps The properties to exclude from encryption
 */
export function encryptJob(job: Job, key: Buffer, iv: Buffer, excludeProps: string[] = []): Job {
    return encryptObject<Job>(job, key, iv, excludeProps);
}
