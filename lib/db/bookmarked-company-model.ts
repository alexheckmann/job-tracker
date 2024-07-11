import mongoose, {model, Schema} from "mongoose";
import {COMPANY_COLLECTION_NAME, USER_COLLECTION_NAME} from "@/lib/db/db-constants";
import {BookmarkedCompany} from "@/lib/models/bookmarked-company";

export const BookmarkedCompanyModelSchema = new Schema<BookmarkedCompany>(
    {
        location: {type: String, required: true},
        companyName: {type: String, required: true},
        isFavorite: {type: Boolean, required: true},
        user: {type: Schema.Types.ObjectId, ref: USER_COLLECTION_NAME}
    }
)

export const BookmarkedCompanyModel = mongoose.models[COMPANY_COLLECTION_NAME]<BookmarkedCompany> || model<BookmarkedCompany>(COMPANY_COLLECTION_NAME, BookmarkedCompanyModelSchema)
