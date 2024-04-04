import "@/lib/db/config"
import {migrate} from "drizzle-orm/vercel-postgres/migrator"
import {db} from "@/lib/db/db"

async function main() {
    await migrate(db, {migrationsFolder: "./drizzle"})
}

main()
