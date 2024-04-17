ALTER TABLE "contacts" ALTER COLUMN "name" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "role" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "company" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "email" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "phone" SET DATA TYPE varchar(32);--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "linkedin" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "location" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "notes" SET DATA TYPE varchar(2048);--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "role" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "company" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "applicationStatus" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "exact_title" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "location" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "link" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "salary" SET DATA TYPE varchar(16);--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "notes" SET DATA TYPE varchar(2048);