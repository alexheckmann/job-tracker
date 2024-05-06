import {z} from "zod";
import {DatabaseObject} from "@/lib/models/database-object";

export const feedbackMaxValueConstraints = {
    feedback: 500,
    rating: 5,
}

export const FeedbackSchema = DatabaseObject.extend({
    rating: z.number().int().min(0).max(feedbackMaxValueConstraints.rating),
    feedback: z.string().min(1).max(feedbackMaxValueConstraints.feedback),
    userId: z.string(),
});

export type Feedback = z.infer<typeof FeedbackSchema>;
