import mongoose, {model, Schema} from "mongoose";
import {Contact} from "@/lib/models/contact";
import {CONTACT_COLLECTION_NAME, USER_COLLECTION_NAME} from "@/lib/db/db-constants";

export const ContactModelSchema = new Schema<Contact>(
    {
        name: {type: String, required: true},
        role: {type: String, required: true},
        company: {type: String, required: true},
        email: {type: String},
        phone: {type: String},
        linkedin: {type: String},
        location: {type: String, required: true},
        notes: {type: String},
        lastUpdate: {type: Date, required: true},
            user: {type: Schema.Types.ObjectId, ref: USER_COLLECTION_NAME}
    }, {timestamps: true}
);

export const ContactModel = mongoose.models[CONTACT_COLLECTION_NAME]<Contact> || model<Contact>(CONTACT_COLLECTION_NAME, ContactModelSchema)
