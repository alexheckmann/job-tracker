import {ToastContent} from "@/lib/models/toast-content";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";

export function useStringArrayRemoval(apiEndpoint: string,
                                      clientData: string[],
                                      setClientData: (data: string[]) => void,
                                      successToastContent: ToastContent,
                                      errorToastContent: ToastContent) {

    const {mutate: mutateData, isPending} = useMutation({
        mutationFn: async (stringToDelete: string) => {
            return await axios.delete<string[]>(`${apiEndpoint}`, {data: JSON.stringify(stringToDelete)})
                .then((res) => res.data)
        },
        onSuccess: async (data) => {
            setClientData([...data])

            toast({
                title: successToastContent.title,
                description: successToastContent.description,
                variant: successToastContent.variant,
                action: successToastContent.action
            })
        },
        onError: async () => {
            setClientData([...clientData])

            toast({
                title: errorToastContent.title,
                description: errorToastContent.description,
                variant: errorToastContent.variant
            })
        }
    })

    return {mutateData, isPending};
}

export function useRemoveRole(roles: string[], setRoles: (data: string[]) => void) {
    const errorToastContent: ToastContent = {
        title: "Error",
        description: "An error occurred while removing the role.",
        variant: "destructive"
    };

    const successToastContent: ToastContent = {
        title: "Role removed",
        description: "The role was removed successfully.",
        variant: "default"
    };

    return useStringArrayRemoval("/api/v1/roles", roles, setRoles, successToastContent, errorToastContent)
}

export function useRemoveLocation(locations: string[], setLocations: (data: string[]) => void) {
    const errorToastContent: ToastContent = {
        title: "Error",
        description: "An error occurred while removing the location.",
        variant: "destructive"
    };

    const successToastContent: ToastContent = {
        title: "Role added",
        description: "The location was removed successfully.",
        variant: "default"
    };

    return useStringArrayRemoval("/api/v1/locations", locations, setLocations, successToastContent, errorToastContent)
}

export function useRemoveKeywords(keywords: string[], setKeywords: (data: string[]) => void) {
    const errorToastContent: ToastContent = {
        title: "Error",
        description: "An error occurred while removing the keywords.",
        variant: "destructive"
    };

    const successToastContent: ToastContent = {
        title: "Keywords removed",
        description: "The keywords were removed successfully.",
        variant: "default"
    };

    return useStringArrayRemoval("/api/v1/keywords", keywords, setKeywords, successToastContent, errorToastContent)
}
