import {boolean, pgEnum, pgTable, timestamp, uuid, varchar} from 'drizzle-orm/pg-core'
import {z} from "zod";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";

export interface ClientStateStore<T> {
    data: T,
    setData: (data: T) => void
}

const statusEnum = pgEnum("applicationStatus", [
    "Saved",
    "Applied",
    "Interviewed",
    "Offered",
    "Declined"
])

export const ApplicationStatus = z.enum(statusEnum.enumValues)

const jobsMaxLengthConstraints = {
    role: 128,
    company: 128,
    exactTitle: 128,
    location: 256,
    link: 256,
    salary: 16,
    notes: 2048
}

export const JobsTable = pgTable(
    'jobs',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        role: varchar('role', {length: jobsMaxLengthConstraints.role}).notNull(),
        company: varchar('company', {length: jobsMaxLengthConstraints.company}).notNull(),
        status: varchar('applicationStatus', {enum: statusEnum.enumValues}).notNull(),
        exactTitle: varchar('exact_title', {length: jobsMaxLengthConstraints.exactTitle}).notNull(),
        location: varchar('location', {length: jobsMaxLengthConstraints.location}).notNull(),
        link: varchar('link', {length: jobsMaxLengthConstraints.link}),
        salary: varchar('salary', {length: jobsMaxLengthConstraints.salary}),
        isFavorite: boolean('is_favorite').notNull(),
        isRecruiter: boolean('is_recruiter').notNull(),
        isReferral: boolean('is_referral').notNull(),
        notes: varchar('notes', {length: jobsMaxLengthConstraints.notes}),
        lastUpdate: timestamp('last_update').defaultNow().notNull(),
    }
)

export const insertJobSchema = createInsertSchema(JobsTable, {
    role: z.string().min(1).max(jobsMaxLengthConstraints.role),
    company: z.string().min(1).max(jobsMaxLengthConstraints.company),
    location: z.string().min(1).max(jobsMaxLengthConstraints.location),
    exactTitle: z.string().max(jobsMaxLengthConstraints.exactTitle),
    link: z.string().max(jobsMaxLengthConstraints.link),
    salary: z.string().max(jobsMaxLengthConstraints.salary),
    notes: z.string().max(jobsMaxLengthConstraints.notes),
    lastUpdate: z.coerce.date()
})

export const selectJobSchema = createSelectSchema(JobsTable, {
    role: z.string().min(1).max(jobsMaxLengthConstraints.role),
    company: z.string().min(1).max(jobsMaxLengthConstraints.company),
    location: z.string().min(1).max(jobsMaxLengthConstraints.location),
    exactTitle: z.string().max(jobsMaxLengthConstraints.exactTitle),
    link: z.string().max(jobsMaxLengthConstraints.link),
    salary: z.string().max(jobsMaxLengthConstraints.salary),
    notes: z.string().max(jobsMaxLengthConstraints.notes),
    lastUpdate: z.coerce.date()
})
export type JobEntry = z.infer<typeof insertJobSchema>

export type InsertedJobEntry = z.infer<typeof selectJobSchema>

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

export const ContactsTable = pgTable(
    'contacts',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        name: varchar('name', {length: contactsMaxLengthConstraints.name}).notNull(),
        role: varchar('role', {length: contactsMaxLengthConstraints.role}).notNull(),
        company: varchar('company', {length: contactsMaxLengthConstraints.company}).notNull(),
        email: varchar('email', {length: contactsMaxLengthConstraints.email}),
        phone: varchar('phone', {length: contactsMaxLengthConstraints.phone}),
        linkedin: varchar('linkedin', {length: contactsMaxLengthConstraints.linkedin}),
        location: varchar('location', {length: contactsMaxLengthConstraints.location}).notNull(),
        notes: varchar('notes', {length: contactsMaxLengthConstraints.notes}),
        lastUpdate: timestamp('last_update').defaultNow().notNull(),
    }
)

export const insertContactSchema = createInsertSchema(ContactsTable, {
    name: z.string().min(1).max(contactsMaxLengthConstraints.name),
    role: z.string().min(1).max(contactsMaxLengthConstraints.role),
    company: z.string().min(1).max(contactsMaxLengthConstraints.company),
    location: z.string().min(1).max(contactsMaxLengthConstraints.location),
    lastUpdate: z.coerce.date()
})

export const selectContactSchema = createSelectSchema(ContactsTable, {
    name: z.string().min(1).max(contactsMaxLengthConstraints.name),
    role: z.string().min(1).max(contactsMaxLengthConstraints.role),
    company: z.string().min(1).max(contactsMaxLengthConstraints.company),
    location: z.string().min(1).max(contactsMaxLengthConstraints.location),
    lastUpdate: z.coerce.date()
})

export type ContactEntry = z.infer<typeof insertContactSchema>

export type InsertedContactEntry = z.infer<typeof selectContactSchema>
