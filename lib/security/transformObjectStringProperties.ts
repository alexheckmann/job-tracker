/**
 * Transforms the string properties of an object using the provided callback to either encrypt or decrypt the data.
 * Currently handles the following cases:
 * - Single, non-empty string properties
 * - Array of string properties
 * - Excluded properties
 * - Non-string properties
 * - Nested objects
 * - Arrays of nested objects
 *
 * Note: This function is not recursive and will not transform nested objects.
 * @param obj The object to transform
 * @param callback The callback to use to transform the string properties
 * @param excludeProps The properties to exclude from transformation
 * @returns obj The transformed object
 */
export function transformObjectStringProperties<T extends Record<string, unknown>>(obj: T, callback: (data: string) => string, excludeProps: string[] = []): T {
    let transformedObject: T = {} as T;

    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (excludeProps.includes(prop)) {
                transformedObject[prop] = obj[prop];
            } else if (typeof obj[prop] === 'string' && obj[prop] !== '') {
                // @ts-ignore
                transformedObject[prop] = callback(obj[prop]);
            } else if (Array.isArray(obj[prop]) && !!obj[prop] && (obj[prop] as any[]).every((item: any) => typeof item === 'string')) {
                transformedObject[prop] = (obj[prop] as string[]).map((item: string) => callback(item)) as T[Extract<keyof T, string>];
            } else if (typeof obj[prop] === 'object' && Object.prototype.toString.call(obj[prop]) === '[object Object]' && obj[prop] !== null) {
                // @ts-ignore
                transformedObject[prop] = transformObjectStringProperties(obj[prop], callback, excludeProps);
            } else if (Array.isArray(obj[prop]) && !!obj[prop] && (obj[prop] as any[]).every((item: any) => typeof item === 'object' && item !== null)) {
                transformedObject[prop] = (obj[prop] as any[]).map((item: any) => transformObjectStringProperties(item, callback, excludeProps)) as T[Extract<keyof T, string>];
            } else {
                transformedObject[prop] = obj[prop];
            }
        }
    }


    return transformedObject;
}
