import mongoose, {model, Schema} from "mongoose";
import {FEEDBACK_COLLECTION_NAME} from "@/lib/db/db-constants";
import {Feedback} from "@/lib/models/feedback";

const FeedbackModelSchema = new Schema<Feedback>({
        rating: {
            type: Number,
            required: true
        },
        feedback: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

export const FeedbackModel = mongoose.models[FEEDBACK_COLLECTION_NAME] || model(FEEDBACK_COLLECTION_NAME, FeedbackModelSchema)
