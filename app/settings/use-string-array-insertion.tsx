import {ToastContent} from "@/lib/models/toast-content";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";

export function useStringArrayInsertion(apiEndpoint: string,
                                        clientData: string[],
                                        setClientData: (data: string[]) => void,
                                        successToastContent: ToastContent,
                                        errorToastContent: ToastContent) {

    const {mutate: mutateData, isPending} = useMutation({
        mutationFn: async (stringToInsert: string) => {
            return await axios.post<string[]>(`${apiEndpoint}`, JSON.stringify(stringToInsert))
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

export function useInsertRole(roles: string[], setRoles: (data: string[]) => void) {
    const errorToastContent: ToastContent = {
        title: "Error",
        description: "An error occurred while adding the role.",
        variant: "destructive"
    };
    const successToastContent: ToastContent = {
        title: "Role added",
        description: "The role was added successfully.",
        variant: "default"
    };

    return useStringArrayInsertion("/api/v1/roles", roles, setRoles, successToastContent, errorToastContent)
}

export function useInsertLocation(locations: string[], setLocations: (data: string[]) => void) {
    const errorToastContent: ToastContent = {
        title: "Error",
        description: "An error occurred while adding the location.",
        variant: "destructive"
    };
    const successToastContent: ToastContent = {
        title: "Role added",
        description: "The location was added successfully.",
        variant: "default"
    };

    return useStringArrayInsertion("/api/v1/locations", locations, setLocations, successToastContent, errorToastContent)
}
