import {ContactModel} from "@/lib/db/contact-model";
import {Contact} from "@/lib/models/contact";
import {Job} from "@/lib/models/job";
import {JobModel} from "@/lib/db/job-model";
import {User} from "@/lib/models/user";
import {UserModel} from "@/lib/db/user-model";
import mongoose from "mongoose";


/**
 * Create a job in the database
 * @param job The job to create
 * @returns The created job
 */
export function createJob(job: Job) {
    return JobModel.create(job)
}

/**
 * Get all jobs from the database
 * @returns All jobs
 */
export function getJobs(userId: string) {
    return JobModel.find<Job>({user: new mongoose.Types.ObjectId(userId)}).exec()
}

/**
 * Update a job in the database
 * @param id The id of the job to update
 * @param job The updated job
 * @returns The updated job
 */
export function updateJob(id: string, job: Partial<Job>) {
    return JobModel.findByIdAndUpdate(job._id, job, {new: true}).exec()
}

/**
 * Delete a job from the database
 * @param id The id of the job to delete
 * @returns The deleted job
 */
export function deleteJob(id: string) {
    return JobModel.findByIdAndDelete(id).exec()
}

/**
 * Create a contact in the database
 * @param contact The contact to create
 * @returns The created contact
 */
export function createContact(contact: Contact) {
    return ContactModel.create(contact)
}

/**
 * Get all contacts from the database for a user
 * @returns All contacts
 */
export function getContacts(userId: string) {
    return ContactModel.find<Contact>({user: new mongoose.Types.ObjectId(userId)}).exec()
}

/**
 * Update a contact in the database
 * @param id The id of the contact to update
 * @param contact The updated contact
 * @returns The updated contact
 */
export function updateContact(id: string, contact: Partial<Contact>) {
    return ContactModel.findByIdAndUpdate(contact._id, contact, {new: true}).exec()
}

/**
 * Delete a contact from the database
 * @param id The id of the contact to delete
 * @returns The deleted contact
 */
export function deleteContact(id: string) {
    return ContactModel.findByIdAndDelete(id).exec()
}

export function createUser(user: User) {
    return UserModel.create<User>(user)
}

export function getUserByEmail(email: string) {
    return UserModel.findOne<User>({email}).exec()
}

