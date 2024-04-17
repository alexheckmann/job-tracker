import {StoreApi, UseBoundStore} from "zustand";
import {ClientStateStore, InsertedContactEntry, InsertedJobEntry} from "@/lib/db/schema";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {ToastContent, TypeHasIdAndLastUpdate} from "@/app/data/use-delete-data";
import {useContactEntriesStore, useJobEntriesStore} from "@/app/data/job-data";
import {ToastAction} from "@/components/ui/toast";

export function useUpdateData<T extends TypeHasIdAndLastUpdate>(apiEndpoint: string,
                                                                dataKey: string[],
                                                                useClientState: UseBoundStore<StoreApi<ClientStateStore<T[]>>>,
                                                                dataToUpdate: T,
                                                                successToastContent: ToastContent,
                                                                errorToastContent: ToastContent,
                                                                setUiState?: (data: any) => void,
                                                                uiStateToSet?: any) {
    const {data: clientData, setData: setClientData} = useClientState();
    const queryClient = useQueryClient();

    const {mutate: mutateData, isPending} = useMutation({
        mutationFn: async (dataToUpdate: T) => {
            const id = dataToUpdate.id;
            return await axios.put<T>(`${apiEndpoint}/${id}`, {...dataToUpdate})
                .then((res) => {
                    return {
                        ...res.data,
                        lastUpdate: new Date(res.data.lastUpdate)
                    }
                })
        },
        onMutate: async () => {
            await queryClient.cancelQueries({queryKey: dataKey})
            const previousData = queryClient.getQueryData<T[]>(dataKey)
            queryClient.setQueryData(dataKey, clientData)
            return {previousData}
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({queryKey: dataKey});
            const index = clientData.findIndex(item => item.id === dataToUpdate.id);

            if (index !== -1) {
                const updatedClientData = clientData.toSpliced(index, 1, data)
                setClientData(updatedClientData)
            }

            if (!!setUiState) {
                setUiState(uiStateToSet)
            }

            toast({
                title: successToastContent.title,
                description: successToastContent.description,
                variant: successToastContent.variant
            })
        },
        onError: async (_, __, context) => {
            queryClient.setQueryData([dataKey], context?.previousData);

            toast({
                title: errorToastContent.title,
                description: errorToastContent.description,
                variant: errorToastContent.variant
            })
        }
    })

    return {mutateData, isPending};
}

export function useUpdateJob(job: InsertedJobEntry, setUiState?: (data: any) => void, uiStateToSet?: any) {

    // TODO implement success undo action
    const successToastContent: ToastContent = {
        title: "Job updated",
        description: `The job at ${job.company} has been updated.`,
        variant: "default",
        action: (
            <ToastAction altText="Retry">Retry</ToastAction>
        )
    }

    // TODO implement error retry action
    const errorToastContent: ToastContent = {
        title: "Failed to update job",
        description: `The job at ${job.company} could not be updated.`,
        variant: "destructive",
        action: (
            <ToastAction altText="Retry">Retry</ToastAction>
        )
    }

    return useUpdateData<InsertedJobEntry>('/api/v1/jobs', ['jobs'], useJobEntriesStore, job, successToastContent, errorToastContent, setUiState, uiStateToSet)
}

export function useUpdateContact(contact: InsertedContactEntry, setUiState?: (data: any) => void, uiStateToSet?: any) {

    // TODO implement success undo action
    const successToastContent: ToastContent = {
        title: "Contact updated",
        description: `The contact at ${contact.company} has been updated.`,
        variant: "default",
        action: (
            <ToastAction altText="Retry">Retry</ToastAction>
        )
    }

    // TODO implement error retry action
    const errorToastContent: ToastContent = {
        title: "Failed to update contact",
        description: `The contact at ${contact.company} could not be updated.`,
        variant: "destructive",
        action: (
            <ToastAction altText="Retry">Retry</ToastAction>
        )
    }

    return useUpdateData<InsertedContactEntry>('/api/v1/contacts', ['contacts'], useContactEntriesStore, contact, successToastContent, errorToastContent, setUiState, uiStateToSet)
}
