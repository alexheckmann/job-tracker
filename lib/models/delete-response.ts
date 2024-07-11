import {z} from "zod";

export const DeleteResponseSchema = z.object({
    deletedId: z.string().min(1)
})
export type DeleteResponse = z.infer<typeof DeleteResponseSchema>
