import {Job} from "@/lib/models/job";
import {JobModel} from "@/lib/db/job-model";
import {getMongooseIdObject} from "@/lib/db/db-helpers";
// import models so that mongoose dependencies are initialized
import "@/lib/db/import-models"

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
