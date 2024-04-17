CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 1: Add a new column of type UUID
ALTER TABLE "contacts" ADD COLUMN "uuid_id" UUID;
ALTER TABLE "jobs" ADD COLUMN "uuid_id" UUID;

-- Step 2: Generate UUIDs for each existing row
UPDATE "contacts" SET "uuid_id" = uuid_generate_v4();
UPDATE "jobs" SET "uuid_id" = uuid_generate_v4();

-- Step 3: Set the new column as the primary key
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_pkey";
ALTER TABLE "contacts" ADD PRIMARY KEY ("uuid_id");

ALTER TABLE "jobs" DROP CONSTRAINT "users_pkey";
ALTER TABLE "jobs" ADD PRIMARY KEY ("uuid_id");

-- Step 4: Drop the old primary key column
ALTER TABLE "contacts" DROP COLUMN "id";
ALTER TABLE "jobs" DROP COLUMN "id";

-- Optional: Rename the new column to "id"
ALTER TABLE "contacts" RENAME COLUMN "uuid_id" TO "id";
ALTER TABLE "jobs" RENAME COLUMN "uuid_id" TO "id";
