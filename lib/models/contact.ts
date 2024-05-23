import {z} from "zod";
import {UserSpecificDatabaseObject} from "@/lib/models/database-object";

const contactsMaxLengthConstraints = {
    name: 128,
    role: 128,
    company: 128,
    email: 256,
    phone: 32,
    linkedin: 256,
    location: 256,
    notes: 2048
}

export const ContactSchema = UserSpecificDatabaseObject.extend({
    name: z.string().min(1).max(contactsMaxLengthConstraints.name),
    role: z.string().min(1).max(contactsMaxLengthConstraints.role),
    company: z.string().min(1).max(contactsMaxLengthConstraints.company),
    email: z.string().max(contactsMaxLengthConstraints.email).optional(),
    phone: z.string().max(contactsMaxLengthConstraints.phone).optional(),
    linkedin: z.string().max(contactsMaxLengthConstraints.linkedin).optional(),
    location: z.string().min(1).max(contactsMaxLengthConstraints.location),
    notes: z.string().max(contactsMaxLengthConstraints.notes).optional(),
    // isPersonalConnection: z.boolean(),
    lastUpdate: z.coerce.date(),
    status: z.enum(["Saved", "Continuing", "Discontinued"]).optional(),
});

export type Contact = z.infer<typeof ContactSchema>;
