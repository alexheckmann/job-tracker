import {BookmarkedCompanyModel} from "@/lib/db/bookmarked-company-model";
import {getMongooseIdObject} from "@/lib/db/db-helpers";
import {BookmarkedCompany} from "@/lib/models/bookmarked-company";
// import models so that mongoose dependencies are initialized
import "@/lib/db/import-models"

/**
 * Inserts a bookmarked company into the database
 * @param bookmarkedCompany The bookmarked company to insert
 * @param userId The id of the user associated with the bookmarked company
 * @returns bookmarkedCompany The inserted bookmarked company as a promise
 */
export function insertBookmarkedCompany(bookmarkedCompany: BookmarkedCompany, userId: string) {
    return BookmarkedCompanyModel.create<BookmarkedCompany>({...bookmarkedCompany, user: getMongooseIdObject(userId)})
}

/**
 * Get all bookmarked companies from the database for a user
 * @param userId The id of the user to get jobs for
 * @returns jobs all jobs
 */
export function getBookmarkedCompanies(userId: string) {
    return BookmarkedCompanyModel.find<BookmarkedCompany>({user: getMongooseIdObject(userId)}).exec()
}

/**
 * Delete a bookmarked company in the database for a user
 * @param id The id of the bookmarked company to delete
 * @returns The updated bookmarked company
 */
export function deleteBookmarkedCompany(id: string) {
    return BookmarkedCompanyModel.findByIdAndDelete(id).exec()
}
