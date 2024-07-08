import {z} from "zod";
import {DatabaseObject} from "@/lib/models/database-object";

const BookmarkedCompanySchema = z.object({
    companyName: z.string().min(1),
    isFavorite: z.boolean()
});

export type BookmarkedCompany = z.infer<typeof BookmarkedCompanySchema>;

export const BookmarkedCompaniesByLocationSchema = z.object({
    location: z.string().min(1),
    companies: z.array(BookmarkedCompanySchema).optional(),
});

const userMaxLengthConstraints = {
    name: 128,
    email: 256,
}

export type BookmarkedCompaniesByLocation = z.infer<typeof BookmarkedCompaniesByLocationSchema>;

export const UserSchema = DatabaseObject.extend({
    name: z.string().min(1).max(userMaxLengthConstraints.name),
    email: z.string().min(1).max(userMaxLengthConstraints.email),
    roles: z.array(z.string().min(1)).optional(),
    locations: z.array(z.string().min(1)).optional(),
    keywords: z.array(z.string().min(1)).optional(),
    encryptedKey: z.string().optional(),
    companiesByLocation: z.array(BookmarkedCompaniesByLocationSchema).optional(),
    agenciesByLocation: z.array(BookmarkedCompaniesByLocationSchema).optional()
});

export type User = z.infer<typeof UserSchema>;
