import {FeedbackModel} from "@/lib/db/feedback-model";
import {Feedback} from "@/lib/models/feedback";
// import models so that mongoose dependencies are initialized
import "@/lib/db/import-models"

/**
 * Create a feedback in the database
 * @param rating The rating
 * @param feedback The feedback
 * @param userId The id of the user associated with the feedback. Empty string if the user is not logged in.
 */
export function createFeedback(rating: number, feedback: string, userId: string) {
    return FeedbackModel.create<Feedback>({rating, feedback, userId})
}
