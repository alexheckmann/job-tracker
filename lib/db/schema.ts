import {boolean, pgEnum, pgTable, serial, text, timestamp,} from 'drizzle-orm/pg-core'
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

export const JobsTable = pgTable(
    'jobs',
    {
        id: serial('id').primaryKey(),
        role: text('role').notNull(),
        company: text('company').notNull(),
        status: text('applicationStatus', {enum: statusEnum.enumValues}).notNull(),
        exactTitle: text('exact_title').notNull(),
        location: text('location').notNull(),
        link: text('link'),
        salary: text('salary'),
        isFavorite: boolean('is_favorite').notNull(),
        isRecruiter: boolean('is_recruiter').notNull(),
        notes: text('notes'),
        lastUpdate: timestamp('last_update').defaultNow().notNull(),
    }
)

export const insertJobSchema = createInsertSchema(JobsTable, {
    role: z.string().min(1),
    company: z.string().min(1),
    location: z.string().min(1),
    lastUpdate: z.coerce.date()
})

export const selectJobSchema = createSelectSchema(JobsTable, {
    role: z.string().min(1),
    company: z.string().min(1),
    location: z.string().min(1),
    lastUpdate: z.coerce.date()
})
export type JobEntry = z.infer<typeof insertJobSchema>

export type InsertedJobEntry = z.infer<typeof selectJobSchema>

export const ContactsTable = pgTable(
    'contacts',
    {
        id: serial('id').primaryKey(),
        name: text('name').notNull(),
        role: text('role').notNull(),
        company: text('company').notNull(),
        email: text('email'),
        phone: text('phone'),
        linkedin: text('linkedin'),
        location: text('location').notNull(),
        notes: text('notes'),
        lastUpdate: timestamp('last_update').defaultNow().notNull(),
    }
)

export const insertContactSchema = createInsertSchema(ContactsTable, {
    name: z.string().min(1),
    role: z.string().min(1),
    company: z.string().min(1),
    location: z.string().min(1),
    lastUpdate: z.coerce.date()
})

export const selectContactSchema = createSelectSchema(ContactsTable, {
    name: z.string().min(1),
    role: z.string().min(1),
    company: z.string().min(1),
    location: z.string().min(1),
    lastUpdate: z.coerce.date()
})

export type ContactEntry = z.infer<typeof insertContactSchema>

export type InsertedContactEntry = z.infer<typeof selectContactSchema>
