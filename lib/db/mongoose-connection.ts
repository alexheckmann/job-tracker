import mongoose from 'mongoose';
import {DB_NAME} from "@/lib/db/constants";

const mongoosePromise = mongoose.connect(process.env.MONGODB_URI || "", {
    dbName: DB_NAME,
})

/**
 * Exports a module-scoped promise for using Mongoose as the database interaction object. Needs to be awaited before
 * using Mongoose.
 */
export default mongoosePromise
