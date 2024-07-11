import {BookmarkedCompanyModel} from "@/lib/db/bookmarked-company-model";
import {getMongooseIdObject} from "@/lib/db/db-helpers";
import {BookmarkedCompany} from "@/lib/models/bookmarked-company";

/**
 * Inserts a bookmarked company into the database
 * @param bookmarkedCompany The bookmarked company to insert
 * @param userId The id of the user associated with the bookmarked company
 * @returns bookmarkedCompany The inserted bookmarked company as a promise
 */
export function insertBookmarkedCompany(bookmarkedCompany: BookmarkedCompany, userId: string) {
    return BookmarkedCompanyModel.create({...bookmarkedCompany, user: getMongooseIdObject(userId)})
}

