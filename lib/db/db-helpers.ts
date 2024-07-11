import mongoose from "mongoose";
import {cache} from "react";

/**
 * Get a mongoose object id from a string
 * @param id The string id
 * @returns A mongoose object id
 */
function createMongooseIdObject(id: string): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(id)
}

/**
 * Cache the createMongooseIdObject function to avoid re-creating the object id.
 * This function is used to create a mongoose id object from a string.
 * @param id The string id
 * @returns id A mongoose id object
 */
export const getMongooseIdObject: (id: string) => mongoose.Types.ObjectId = cache(createMongooseIdObject)

