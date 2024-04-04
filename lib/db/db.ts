import "@/lib/config"
import {drizzle} from "drizzle-orm/vercel-postgres";
import {sql} from "@vercel/postgres";
import {JobsTable} from "@/lib/schema";
import * as schema from "@/lib/schema";


// Connect to Vercel Postgres
export const db = drizzle(sql, { schema })

export type NewJob = typeof JobsTable.$inferInsert

export function insertJob(job: NewJob) {
    return db.insert(JobsTable).values(job).returning()
}

export function getJobs() {
    return db.select().from(JobsTable)
}
