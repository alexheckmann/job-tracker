import mongoose, {model, Schema} from "mongoose";
import {Job} from "@/lib/models/job";
import {JOB_COLLECTION_NAME, USER_COLLECTION_NAME} from "@/lib/db/constants";

export const JobModelSchema = new Schema<Job>(
    {
        role: {type: String, required: true},
        company: {type: String, required: true},
        status: {type: String, required: true},
        exactTitle: {type: String},
        location: {type: String, required: true},
        link: {type: String},
        salary: {type: String},
        isFavorite: {type: Boolean, required: true},
        isRecruiter: {type: Boolean, required: true},
        isReferral: {type: Boolean, required: true},
        notes: {type: String},
        lastUpdate: {type: Date, required: true},
            user: {type: Schema.Types.ObjectId, ref: USER_COLLECTION_NAME}
    }, {timestamps: true}
);

export const JobModel = mongoose.models[JOB_COLLECTION_NAME]<Job> || model<Job>(JOB_COLLECTION_NAME, JobModelSchema)
