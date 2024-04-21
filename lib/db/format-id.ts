import {BSON} from "bson";

/**
 * Format id to BSON ObjectId type so it can be used in queries without errors from MongoDB
 * @param id The id to format.
 */
export function formatId(id: string) {
    return new BSON.ObjectId(id);
}
