/**
 * Truncate a string to a certain length. Used as a workaround for the lack of ellipsis support in Data Table.
 * @param str the string to truncate
 * @param num the number of characters to truncate to
 * @returns the truncated string
 */
export function truncateString(str: string, num: number) {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...'
}
