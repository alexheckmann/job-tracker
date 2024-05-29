/**
 * Returns an empty array of a given size. Useful for creating a list of Skeletons for representing loading states.
 * @param size The size of the array to create
 * @returns array An array of the given size
 */
export function getEmptyArray(size: number) {
    return Array.from({length: size}, (_, i) => i)
}
