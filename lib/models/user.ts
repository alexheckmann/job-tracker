import {z} from "zod";
import {DatabaseObject} from "@/lib/models/database-object";

const UserCompanySchema = z.object({
    name: z.string().min(1),
    isFavorite: z.boolean()
});

export type UserCompany = z.infer<typeof UserCompanySchema>;

export const UserCompaniesListSchema = z.object({
    location: z.string().min(1),
    company: z.array(UserCompanySchema).optional(),
});

const userMaxLengthConstraints = {
    name: 128,
    email: 256,
}

export type UserCompaniesList = z.infer<typeof UserCompaniesListSchema>;

export const UserSchema = DatabaseObject.extend({
    name: z.string().min(1).max(userMaxLengthConstraints.name),
    email: z.string().min(1).max(userMaxLengthConstraints.email),
    roles: z.array(z.string().min(1)).optional(),
    locations: z.array(z.string().min(1)).optional(),
    keywords: z.array(z.string().min(1)).optional(),
    encryptedKey: z.string().optional(),
    companies: z.array(UserCompaniesListSchema).optional()
});

export type User = z.infer<typeof UserSchema>;
