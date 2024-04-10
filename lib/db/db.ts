import "@/lib/db/config"
import {drizzle} from "drizzle-orm/vercel-postgres";
import {sql} from "@vercel/postgres";
import {JobsTable} from "@/lib/db/schema";
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
