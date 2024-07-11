import {ContactModel} from "@/lib/db/contact-model";
import {Contact} from "@/lib/models/contact";
import {getMongooseIdObject} from "@/lib/db/db-helpers";

/**
 * Create a contact in the database for a user
 * @param contact The contact to create
 * @param userId The id of the user associated with the contact
 * @returns contact The created contact
 */
export function insertContact(contact: Contact, userId: string) {
    return ContactModel.create({...contact, user: getMongooseIdObject(userId)})
}

/**
 * Get all contacts from the database for a user
 * @returns contacts All contacts
 */
export function getContacts(userId: string) {
    return ContactModel.find<Contact>({user: getMongooseIdObject(userId)}).sort({lastUpdate: -1}).exec()
}

/**
 * Update a contact in the database for a user
 * @param contact The updated contact
 * @returns contact The updated contact
 */
export function updateContact(contact: Partial<Contact>) {
    return ContactModel.findByIdAndUpdate(contact._id, contact, {new: true}).exec()
}

/**
 * Delete a contact from the database for a user
 * @param id The id of the contact to delete
 * @returns contact The deleted contact
 */
export function deleteContact(id: string) {
    return ContactModel.findByIdAndDelete(id).exec()
}
