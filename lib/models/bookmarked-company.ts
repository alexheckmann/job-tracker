import {z} from "zod";
import {UserSpecificDatabaseObject} from "@/lib/models/database-object";

const bookmarkedCompanyMaxLengthConstraints = {
    companyName: 256,
}

export const BookmarkedCompanySchema = UserSpecificDatabaseObject.extend({
    location: z.string().min(1),
    companyName: z.string().min(1).max(bookmarkedCompanyMaxLengthConstraints.companyName),
    isFavorite: z.boolean()
})

export type BookmarkedCompany = z.infer<typeof BookmarkedCompanySchema>;
