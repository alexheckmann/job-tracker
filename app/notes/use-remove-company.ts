import {DeleteResponse} from "@/lib/models/delete-response";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {BookmarkedCompany} from "@/lib/models/bookmarked-company";
import {DeleteRequest} from "@/lib/models/delete-request";
import axios from "axios";

export function useRemoveCompany(companyType: "company" | "agency", dataKey: ["companies"] | ["agencies"], onRemoveSuccessCallback: (data: DeleteResponse) => void, onRemoveErrorCallback: () => void) {
    const queryClient = useQueryClient()

    const apiEndpoint = companyType === "company" ? "/api/v1/companies" : "/api/v1/agencies"
    return useMutation({
        mutationFn: async (data: BookmarkedCompany) => {
            const deleteRequest: DeleteRequest = {id: data._id!, userId: data.user}
            return await axios.delete<DeleteResponse>(apiEndpoint, {data: deleteRequest}).then((res) => res.data)
        },
        onSuccess: async (data: DeleteResponse): Promise<void> => {
            onRemoveSuccessCallback(data)
            await queryClient.invalidateQueries({queryKey: dataKey})
        },
        onError: () => {
            onRemoveErrorCallback()
        }
    })
}
