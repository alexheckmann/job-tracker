import {z} from "zod";

export const DeleteRequestSchema = z.object({
    id: z.string().min(1),
    userId: z.string().min(1)
})
export type DeleteRequest = z.infer<typeof DeleteRequestSchema>
