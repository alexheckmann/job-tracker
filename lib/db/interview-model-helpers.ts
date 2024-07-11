import {InterviewModel} from "@/lib/db/interview-model";
import {Interview} from "@/lib/models/interview";
import {getMongooseIdObject} from "@/lib/db/db-helpers";

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
