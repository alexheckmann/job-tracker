import {BookmarkedCompany} from "@/lib/models/bookmarked-company";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export function useAddCompany(companyType: "company" | "agency",
                              dataKey: ["companies"] | ["agencies"],
                              onAddSuccessCallback: (data: BookmarkedCompany) => void,
                              onAddErrorCallback: () => void) {
    const queryClient = useQueryClient()
    const apiEndpoint = companyType === "company" ? "/api/v1/companies" : "/api/v1/agencies"

    return useMutation({
        mutationFn: async (data: BookmarkedCompany) => {
            return await axios.post<BookmarkedCompany>(apiEndpoint, data)
                .then((res) => res.data)
        },

        onSuccess: async (data: BookmarkedCompany): void => {
            onAddSuccessCallback(data)
            await queryClient.invalidateQueries({queryKey: dataKey})
        },
        onError: () => {
            onAddErrorCallback()
        }
    })
}
