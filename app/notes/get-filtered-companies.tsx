import {BookmarkedCompany} from "@/lib/models/bookmarked-company";

/**
 * Filters the companies based on the location selected by the user and returns the filtered companies in alphabetical order,
 * with global companies alphabetically sorted appearing first.
 * @param companies The companies to filter
 * @param location The location to filter by
 * @returns companies The filtered companies
 */
export function getFilteredCompanies(companies: BookmarkedCompany[], location: string): BookmarkedCompany[] {
    const globalCompanies = companies.filter((company: BookmarkedCompany) => company.location === "Worldwide")
        .sort((a: BookmarkedCompany, b: BookmarkedCompany) => a.companyName.localeCompare(b.companyName))

    if (location === "Worldwide") {
        return globalCompanies
    }

    const localCompanies = companies.filter((company: BookmarkedCompany) => company.location === location)
        .sort((a: BookmarkedCompany, b: BookmarkedCompany) => a.companyName.localeCompare(b.companyName))
    return [...globalCompanies, ...localCompanies]
}
