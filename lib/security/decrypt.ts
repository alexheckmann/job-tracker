import crypto from "crypto";
import {Job} from "@/lib/models/job";
import {cache} from "react";
import {transformObjectStringProperties} from "@/lib/security/transformObjectStringProperties";
import {User} from "@/lib/models/user";
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
 * @returns obj The decrypted object
 */
export function decryptObject<T extends Record<string, unknown>>(obj: any, key: Buffer, iv: Buffer, excludeProps: string[] = []): T {
    return transformObjectStringProperties<T>(obj,
        (data: string) => cachedDecrypt(data, key, iv),
        [...excludeProps, ...EXCLUDE_OBJECT_PROPS]);
}

/**
 * Decrypts the user object using the provided key and initialization vector.
 * @param user The user to decrypt
 * @param key The key to use for decryption
 * @param iv The initialization vector to use for decryption
 * @returns user The decrypted user
 */
export function decryptUser(user: User, key: Buffer, iv: Buffer): User {
    return decryptObject<User>(user, key, iv, EXCLUDE_USER_PROPS);
}

/**
 * Decrypts the job object using the provided key and initialization vector.
 * @param job The job to decrypt
 * @param key The key to use for decryption
 * @param iv The initialization vector to use for decryption
 * @returns job The decrypted job
 */
export function decryptJob(job: Job, key: Buffer, iv: Buffer): Job {
    return decryptObject<Job>(job, key, iv, EXCLUDE_JOB_PROPS);
}

/**
 * Decrypts the interview object using the provided key and initialization vector.
 * @param interview The interview to decrypt
 * @param key The key to use for decryption
 * @param iv The initialization vector to use for decryption
 * @returns interview The decrypted interview
 */
export function decryptInterview(interview: Interview, key: Buffer, iv: Buffer): Interview {
    return decryptObject<Interview>(interview, key, iv, EXCLUDE_INTERVIEW_PROPS);
}

/**
 * Decrypts the contact object using the provided key and initialization vector.
 * @param contact The contact to decrypt
 * @param key The key to use for decryption
 * @param iv The initialization vector to use for decryption
 * @returns contact The decrypted contact
 */
export function decryptContact(contact: Contact, key: Buffer, iv: Buffer): Contact {
    return decryptObject<Contact>(contact, key, iv, EXCLUDE_CONTACT_PROPS);
}
