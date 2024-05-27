import mongoose, {model, Schema} from "mongoose";
import {USER_COLLECTION_NAME} from "@/lib/db/constants";
import {User} from "@/lib/models/user";

const UserModelSchema = new Schema<User>({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        required: false
    },
    locations: {
        type: [String],
        required: false
    },
    keywords: {
        type: [String],
        required: false
    },
    companies: {
        type: [{
            location: {
                type: String,
                required: true
            },
            company: {
                type: [{
                    name: {
                        type: String,
                        required: true
                    }
                }],
                required: false
            }
        }],
        required: false
    }
}, {timestamps: true})

export const UserModel = mongoose.models[USER_COLLECTION_NAME] || model(USER_COLLECTION_NAME, UserModelSchema)
