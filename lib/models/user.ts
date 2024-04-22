import {z} from "zod";
import {DatabaseObject} from "@/lib/models/database-object";

const userMaxLengthConstraints = {
    name: 128,
    email: 256,
}

export const UserSchema = DatabaseObject.extend({
    name: z.string().min(1).max(userMaxLengthConstraints.name),
    email: z.string().min(1).max(userMaxLengthConstraints.email),
});

export type User = z.infer<typeof UserSchema>;
