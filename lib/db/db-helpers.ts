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
 * Get a mongoose object id from a string
 * @param id The string id
 * @returns A mongoose object id
 */
function createMongooseIdObject(id: string): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(id)
}

/**
 * Cache the createMongooseIdObject function to avoid re-creating the object id.
 * This function is used to create a mongoose id object from a string.
 * @param id The string id
 * @returns id A mongoose id object
 */
export const getMongooseIdObject: (id: string) => mongoose.Types.ObjectId = cache(createMongooseIdObject)

/**
 * Create a job in the database for a user
 * @param job The job to create
 * @param userId The id of the user associated with the job
 * @returns The created job
 */
export function insertJob(job: Job, userId: string) {
    return JobModel.create({...job, user: getMongooseIdObject(userId)})
}

/**
 * Get all jobs from the database for a user
 * @param userId The id of the user to get jobs for
 * @returns jobs all jobs
 */
export function getJobs(userId: string) {
    return JobModel.find<Job>({user: getMongooseIdObject(userId)}).sort({lastUpdate: -1}).exec()
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
 * @returns job The deleted job
 */
export function deleteJob(id: string) {
    return JobModel.findByIdAndDelete(id).exec()
}

/**
 * Create an interview in the database for a user
 * @param interview The interview to create
 * @param userId The id of the user associated with the interview
 * @returns interview The created interview
 */
export function insertInterview(interview: Interview, userId: string) {
    return InterviewModel.create({...interview, user: getMongooseIdObject(userId)})
}

/**
 * Get all interviews from the database for a user
 * @returns JobModel.find<Interview>({user: new mongoose.Types.ObjectId(userId)}).exec() all jobs
 */
export function getInterviews(userId: string) {
    return InterviewModel.find<Interview>({user: getMongooseIdObject(userId)}).populate("job", ["_id", "role", "exactTitle", "company", "link"]).sort({date: -1}).exec()
}

/**
 * Update an interview in the database for a user
 * @param interview The updated interview
 * @returns interview The updated interview
 */
export function updateInterview(interview: Partial<Interview>) {
    return InterviewModel.findByIdAndUpdate(interview._id, interview, {new: true}).populate("job", ["_id", "role", "exactTitle", "company", "link"]).exec()
}

/**
 * Delete an interview from the database for a user
 * @param id The id of the interview to delete
 * @returns interview The deleted interview
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

/**
 * Create a user in the database
 * @param user The user to create
 * @returns user The created user
 */
export function createUser(user: User) {
    return UserModel.create<User>(user)
}

/**
 * Get the user with the given email from the database. This function is not cached.
 * @param email The email of the user to get
 * @returns user the user with the given email
 */
export function uncachedGetUserByEmail(email: string) {
    return UserModel.findOne<User>({email}).exec()
}

/**
 * Get the user with the given email from the database. This function is cached.
 * @param email The email of the user to get
 * @returns uncachedGetUserByEmail(email) the user with the given email
 */
export const getUserByEmail: (email: string) => Promise<User | null> = cache(async (email: string) => {
    return await uncachedGetUserByEmail(email)
})

/**
 * Get the user with the given id from the database
 * @param id The id of the user to get
 * @returns user The user with the given id
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

/**
 * Create a feedback in the database
 * @param rating The rating
 * @param feedback The feedback
 * @param userId The id of the user associated with the feedback. Empty string if the user is not logged in.
 */
export function createFeedback(rating: number, feedback: string, userId: string) {
    return FeedbackModel.create<Feedback>({rating, feedback, userId})
}
