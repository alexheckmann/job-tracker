import {Interview} from "@/lib/models/interview";
import mongoose, {model, Schema} from "mongoose";
import {INTERVIEW_COLLECTION_NAME} from "@/lib/db/constants";

export const InterviewModelSchema = new Schema<Interview>(
    {
            description: {type: String, required: true},
            date: {type: Date, required: true},
            company: {type: String, required: true},
            type: {type: String, required: true},
            link: {type: String},
            notes: {type: String},
    }
)

export const InterviewModel = mongoose.models[INTERVIEW_COLLECTION_NAME]<Interview> || model<Interview>(INTERVIEW_COLLECTION_NAME, InterviewModelSchema)