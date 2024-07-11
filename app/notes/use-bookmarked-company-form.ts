import {useForm} from "react-hook-form";
import {BookmarkedCompany, BookmarkedCompanySchema} from "@/lib/models/bookmarked-company";
import {zodResolver} from "@hookform/resolvers/zod";

export function useBookmarkedCompanyForm(locationDefaultValue: string) {
    return useForm<BookmarkedCompany>({
        resolver: zodResolver(BookmarkedCompanySchema),
        defaultValues: {
            location: locationDefaultValue,
            companyName: "",
            isFavorite: false
        },
    })
}
