import {z} from "zod";

export const DatabaseObject = z.object({
    _id: z.string().optional(),
    user: z.any().optional()
})

export const UserSpecificDatabaseObject = DatabaseObject.extend({
    user: z.any().optional()
})
