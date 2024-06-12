import {cache} from "react";
import {User} from "@/lib/models/user";
import {Job} from "@/lib/models/job";
import crypto from "crypto";
import {transformObjectStringProperties} from "@/lib/security/transformObjectStringProperties";
import {
    EXCLUDE_CONTACT_PROPS,
    EXCLUDE_INTERVIEW_PROPS,
    EXCLUDE_JOB_PROPS,
    EXCLUDE_OBJECT_PROPS,
    EXCLUDE_USER_PROPS
} from "@/lib/security/exclude-props";
import {Contact} from "@/lib/models/contact";
import {Interview} from "@/lib/models/interview";

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
 * @returns obj The encrypted object
 */
export function encryptObject<T extends Record<string, unknown>>(obj: T, key: Buffer, iv: Buffer, excludeProps: string[] = []): T {
    return transformObjectStringProperties<T>(obj,
        (data: string) => cachedEncrypt(data, key, iv),
        [...excludeProps, ...EXCLUDE_OBJECT_PROPS]);
}

/**
 * Encrypts the user object using the provided key and initialization vector.
 * @param user The user to encrypt
 * @param key The key to use for encryption
 * @param iv The initialization vector to use for encryption
 * @returns user The encrypted user
 */
export function encryptUser(user: User, key: Buffer, iv: Buffer): User {
    return encryptObject<User>(user, key, iv, EXCLUDE_USER_PROPS);
}

/**
 * Encrypts the job object using the provided key and initialization vector.
 * @param job The job to encrypt
 * @param key The key to use for encryption
 * @param iv The initialization vector to use for encryption
 * @returns job The encrypted job
 */
export function encryptJob(job: Job, key: Buffer, iv: Buffer): Job {
    return encryptObject<Job>(job, key, iv, EXCLUDE_JOB_PROPS);
}

/**
 * Encrypts the interview object using the provided key and initialization vector.
 * @param interview The interview to encrypt
 * @param key The key to use for encryption
 * @param iv The initialization vector to use for encryption
 * @returns interview The encrypted interview
 */
export function encryptInterview(interview: Interview, key: Buffer, iv: Buffer): Interview {
    return encryptObject<Interview>(interview, key, iv, EXCLUDE_INTERVIEW_PROPS);
}

/**
 * Encrypts the contact object using the provided key and initialization vector.
 * @param contact The contact to encrypt
 * @param key The key to use for encryption
 * @param iv The initialization vector to use for encryption
 * @returns contact The encrypted contact
 */
export function encryptContact(contact: Contact, key: Buffer, iv: Buffer): Contact {
    return encryptObject<Contact>(contact, key, iv, EXCLUDE_CONTACT_PROPS);
}
