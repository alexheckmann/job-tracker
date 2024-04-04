import {boolean, pgEnum, pgTable, serial, text, timestamp,} from 'drizzle-orm/pg-core'
import {z} from "zod";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";

const statusEnum = pgEnum("applicationStatus", [
    "Saved",
    "Applied",
    "Interviewed",
    "Decided",
    "Rejected",
    "Offered",
    "Accepted",
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
        country: text('country').notNull(),
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
    country: z.string().min(1),
    lastUpdate: z.coerce.date()
})

export const selectJobSchema = createSelectSchema(JobsTable)

