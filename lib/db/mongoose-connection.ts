import mongoose from 'mongoose';
import {DB_NAME} from "@/lib/db/db-constants";

/**
 * Exports a module-scoped promise for using Mongoose as the database interaction object. Needs to be awaited before
 * using Mongoose.
 */
const mongoosePromise = mongoose.connect(process.env.MONGODB_URI || "", {
    dbName: DB_NAME,
})

export default mongoosePromise
