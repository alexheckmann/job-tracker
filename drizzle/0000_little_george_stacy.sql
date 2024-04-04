CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" text NOT NULL,
	"company" text NOT NULL,
	"status" text NOT NULL,
	"job_title" text NOT NULL,
	"location" text NOT NULL,
	"country" text NOT NULL,
	"is_favorite" boolean NOT NULL,
	"is_recruiter" boolean NOT NULL,
	"notes" text,
	"updated" timestamp DEFAULT now() NOT NULL
);
