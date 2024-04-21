import {z} from "zod";

export const DatabaseObject = z.object({
    _id: z.string().optional()
})
