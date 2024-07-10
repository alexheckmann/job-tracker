import {UserSpecificDatabaseObject} from "@/lib/models/database-object";
import {z} from "zod";

export const ApplicationStatus = z.enum(["Saved", "Applied", "Interview", "Offered", "Declined"]);

const jobsMaxLengthConstraints = {
    role: 256,
    company: 256,
    exactTitle: 256,
    location: 256,
    link: 256,
    salary: 16,
    notes: 16384
}
export const JobSchema = UserSpecificDatabaseObject.extend({
    role: z.string().min(1).max(jobsMaxLengthConstraints.role),
    company: z.string().min(1).max(jobsMaxLengthConstraints.company),
    status: ApplicationStatus,
    exactTitle: z.string().max(jobsMaxLengthConstraints.exactTitle),
    location: z.string().min(1).max(jobsMaxLengthConstraints.location),
    link: z.string().max(jobsMaxLengthConstraints.link).optional(),
    salary: z.string().max(jobsMaxLengthConstraints.salary).optional(),
    isFavorite: z.boolean(),
    isRecruiter: z.boolean(),
    isReferral: z.boolean(),
    notes: z.string().max(jobsMaxLengthConstraints.notes).optional(),
    lastUpdate: z.coerce.date(),
},);

export type Job = z.infer<typeof JobSchema>;
