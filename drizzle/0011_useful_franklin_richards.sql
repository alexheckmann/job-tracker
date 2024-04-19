ALTER TABLE "jobs" ADD COLUMN "is_referral" boolean;

/* Set all entries to false */
UPDATE "jobs" SET "is_referral" = false;

/* Make the column not nullable */
ALTER TABLE "jobs" ALTER COLUMN "is_referral" SET NOT NULL;
