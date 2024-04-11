import "@/lib/db/config"
import {drizzle} from "drizzle-orm/vercel-postgres";
import {sql} from "@vercel/postgres";
import {ContactsTable, JobsTable} from "@/lib/db/schema";
import * as schema from "@/lib/db/schema";
import {eq} from "drizzle-orm";

export const db = drizzle(sql, { schema })

export type NewJob = typeof JobsTable.$inferInsert

export function insertJob(job: NewJob) {
    return db.insert(JobsTable).values(job).returning()
}

export function getJobs() {
    return db.select().from(JobsTable)
}

export function deleteJob(id: number) {
    return db.delete(JobsTable).where(eq(JobsTable.id, id))
}

export function updateJob(id: number, updatedJob: Partial<NewJob>) {
    return db.update(JobsTable).set(updatedJob).where(eq(JobsTable.id, id)).returning()
}

export type NewContact = typeof ContactsTable.$inferInsert

export function insertContact(contact: NewContact) {
    return db.insert(ContactsTable).values(contact).returning()
}

export function getContacts() {
    return db.select().from(ContactsTable)
}

export function deleteContact(id: number) {
    return db.delete(ContactsTable).where(eq(ContactsTable.id, id))
}

export function updateContact(id: number, updatedContact: Partial<NewContact>) {
    return db.update(ContactsTable).set(updatedContact).where(eq(ContactsTable.id, id)).returning()
}
