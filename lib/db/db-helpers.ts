import {ContactModel} from "@/lib/db/contact-model";
import {Contact} from "@/lib/models/contact";
import {Job} from "@/lib/models/job";
import {JobModel} from "@/lib/db/job-model";
import {User} from "@/lib/models/user";
import {UserModel} from "@/lib/db/user-model";
import mongoose from "mongoose";
import {cache} from "react";
import {FeedbackModel} from "@/lib/db/feedback-model";
import {Feedback} from "@/lib/models/feedback";
import {Interview} from "@/lib/models/interview";
import {InterviewModel} from "@/lib/db/interview-model";


/**
 * Create a job in the database for a user
 * @param job The job to create
 * @param userId The id of the user associated with the job
 * @returns The created job
 */
export function insertJob(job: Job, userId: string) {
    return JobModel.create({...job, user: new mongoose.Types.ObjectId(userId)})
}

/**
 * Get all jobs from the database for a user
 * @returns JobModel.find<Job>({user: new mongoose.Types.ObjectId(userId)}).exec() all jobs
 */
export function getJobs(userId: string) {
    return JobModel.find<Job>({user: new mongoose.Types.ObjectId(userId)}).sort({lastUpdate: -1}).exec()
}

/**
 * Update a job in the database for a user
 * @param job The updated job
 * @returns The updated job
 */
export function updateJob(job: Partial<Job>) {
    return JobModel.findByIdAndUpdate(job._id, job, {new: true}).exec()
}

/**
 * Delete a job from the database for a user
 * @param id The id of the job to delete
 * @returns The deleted job
 */
export function deleteJob(id: string) {
    return JobModel.findByIdAndDelete(id).exec()
}

/**
 * Create an interview in the database for a user
 * @param interview The interview to create
 * @param userId The id of the user associated with the interview
 * @returns InterviewModel.create({...interview, user: new mongoose.Types.ObjectId(userId)}) The created interview
 */
export function insertInterview(interview: Interview, userId: string) {
    return InterviewModel.create({...interview, user: new mongoose.Types.ObjectId(userId)})
}

/**
 * Get all interviews from the database for a user
 * @returns JobModel.find<Interview>({user: new mongoose.Types.ObjectId(userId)}).exec() all jobs
 */
export function getInterviews(userId: string) {
    return InterviewModel.find<Interview>({user: new mongoose.Types.ObjectId(userId)}).populate("job", ["_id", "role", "exactTitle", "company"]).exec()
}

/**
 * Update an interview in the database for a user
 * @param interview The updated interview
 * @returns InterviewModel.findByIdAndUpdate(interview._id, interview, {new: true}).exec() The updated interview
 */
export function updateInterview(interview: Partial<Interview>) {
    return InterviewModel.findByIdAndUpdate(interview._id, interview, {new: true}).populate("job", ["_id", "role", "exactTitle", "company"]).exec()
}

/**
 * Delete an interview from the database for a user
 * @param id The id of the interview to delete
 * @returns The deleted interview
 */
export function deleteInterview(id: string) {
    return InterviewModel.findByIdAndDelete(id).exec()
}

/**
 * Create a contact in the database for a user
 * @param contact The contact to create
 * @param userId The id of the user associated with the contact
 * @returns The created contact
 */
export function insertContact(contact: Contact, userId: string) {
    return ContactModel.create({...contact, user: new mongoose.Types.ObjectId(userId)})
}

/**
 * Get all contacts from the database for a user
 * @returns All contacts
 */
export function getContacts(userId: string) {
    return ContactModel.find<Contact>({user: new mongoose.Types.ObjectId(userId)}).sort({lastUpdate: -1}).exec()
}

/**
 * Update a contact in the database for a user
 * @param contact The updated contact
 * @returns The updated contact
 */
export function updateContact(contact: Partial<Contact>) {
    return ContactModel.findByIdAndUpdate(contact._id, contact, {new: true}).exec()
}

/**
 * Delete a contact from the database for a user
 * @param id The id of the contact to delete
 * @returns The deleted contact
 */
export function deleteContact(id: string) {
    return ContactModel.findByIdAndDelete(id).exec()
}

/**
 * Create a user in the database
 * @param user The user to create
 */
export function createUser(user: User) {
    return UserModel.create<User>(user)
}

/**
 * Get the user with the given email from the database. This function is not cached.
 * @returns UserModel.findOne<User>({email}).exec() the user with the given email
 */
export function uncachedGetUserByEmail(email: string) {
    return UserModel.findOne<User>({email}).exec()
}

/**
 * Get the user with the given email from the database. This function is cached.
 * @returns uncachedGetUserByEmail(email) the user with the given email
 */
export const getUserByEmail = cache(async (email: string) => {
    return await uncachedGetUserByEmail(email)
})

/**
 * Get the user with the given id from the database
 * @param id The id of the user to get
 */
export function getUserById(id: string) {
    const user = UserModel.findById<User>(id).exec()

    if (!user) {
        console.log(`User not found: ${id}`)
        return null
    }

    return user
}

/**
 * Update a user in the database
 * @param id The id of the user to update
 * @param user The updated user
 */
export function updateUser(id: string, user: Partial<User>) {
    return UserModel.findByIdAndUpdate<User>(id, user, {new: true}).exec()
}

export function createFeedback(rating: number, feedback: string, userId: string) {
    return FeedbackModel.create<Feedback>({rating, feedback, userId})
}
