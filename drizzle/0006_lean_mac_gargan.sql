ALTER TABLE "jobs" ADD COLUMN "link" text;--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN IF EXISTS "country";
