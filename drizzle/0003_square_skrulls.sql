ALTER TABLE "jobs" RENAME COLUMN "job_title" TO "exact_title";--> statement-breakpoint
ALTER TABLE "jobs" RENAME COLUMN "updated" TO "last_update";--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "salary" DROP NOT NULL;
