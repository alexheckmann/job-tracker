import {z} from "zod";
import {DatabaseObject} from "@/lib/models/database-object";

const feedbackMaxLengthConstraints = {
    feedback: 500,
}

export const FeedbackSchema = DatabaseObject.extend({
    rating: z.number().int().min(1).max(5),
    feedback: z.string().min(1).max(feedbackMaxLengthConstraints.feedback),
    userId: z.string().min(1),
});

export type Feedback = z.infer<typeof FeedbackSchema>;
