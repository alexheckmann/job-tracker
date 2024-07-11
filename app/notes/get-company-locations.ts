import {BookmarkedCompany} from "@/lib/models/bookmarked-company";

/**
 * Get a list of all unique locations from a list of companies and saved locations
 * @param companies The list of companies
 * @param savedLocations The list of saved locations
 * @returns locations A list of all unique locations
 */
export function getCompanyLocations(companies: BookmarkedCompany[], savedLocations: string[]): string[] {
    const locations: string[] = []
    companies.forEach((company: BookmarkedCompany) => {
        if (!locations.includes(company.location)) {
            locations.push(company.location)
        }
    })

    const dedupedLocations: Set<string> = new Set<string>(["Worldwide", ...locations, ...savedLocations])
    return Array.from(dedupedLocations)
}
