import {DatabaseObject} from "@/lib/models/database-object";
import {z} from "zod";

export const InterviewType = z.enum(["Initial Call", "Technical Interview", "Executive Call", "Team Call"]);

const interviewMaxLengthConstraints = {
    role: 128,
    company: 128,
    description: 128,
    location: 256,
    link: 256,
    salary: 16,
    notes: 16384
}

export const InterviewSchema = DatabaseObject.extend({
    description: z.string().max(interviewMaxLengthConstraints.description),
    date: z.coerce.date(),
    company: z.string().min(1).max(interviewMaxLengthConstraints.company),
    type: InterviewType,
    link: z.string().max(interviewMaxLengthConstraints.link).optional(),
    notes: z.string().max(interviewMaxLengthConstraints.notes).optional(),
},);

export type Interview = z.infer<typeof InterviewSchema>;
