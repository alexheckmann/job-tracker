import {StoreApi, UseBoundStore} from "zustand";
import {ClientStateStore, InsertedContactEntry, InsertedJobEntry} from "@/lib/db/schema";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {useContactEntriesStore, useJobEntriesStore} from "@/app/data/job-data";
import {ToastAction} from "@/components/ui/toast";

export interface ToastContent {
    title: string
    description: string
    variant: "destructive" | "default",
    action: any
}

export interface TypeHasIdAndLastUpdate {
    id: any,
    lastUpdate: any
}

export function useDeleteData<T extends TypeHasIdAndLastUpdate>(apiEndpoint: string,
                                                                dataKey: string[],
                                                                useClientState: UseBoundStore<StoreApi<ClientStateStore<T[]>>>,
                                                                id: any,
                                                                successToastContent: ToastContent,
                                                                errorToastContent: ToastContent) {
    const {data, setData} = useClientState();
    const queryClient = useQueryClient();

    const {mutate: mutateData, isPending} = useMutation({
        mutationFn: async () => {
            await axios.delete(`${apiEndpoint}/${id}`);
        },
        onMutate: async () => {
            await queryClient.cancelQueries({queryKey: dataKey});
            const previousData = queryClient.getQueryData<T[]>(dataKey);
            queryClient.setQueryData(dataKey, data);
            return {previousData};
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: dataKey});
            data.forEach((entry, index) => {
                if (entry.id === id) {
                    data.splice(index, 1);
                }
            });

            setData([...data]);

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
        },
    });

    return {mutateData, isPending};
}

export function useDeleteJob(job: InsertedJobEntry) {

    // TODO implement success undo action
    const successToastContent: ToastContent = {
        title: "Job deleted",
        description: `The job at ${job.company} has been successfully deleted.`,
        variant: "default",
        action: (
            <ToastAction altText="Undo">Undo</ToastAction>
        )
    }

    // TODO implement error retry action
    const errorToastContent: ToastContent = {
        title: "Deleting unsuccessful",
        description: `Please try again to delete the job at ${job.company}.`,
        variant: "destructive",
        action: (
            <ToastAction altText="Retry">Retry</ToastAction>
        )
    }

    return useDeleteData<InsertedJobEntry>("/api/v1/jobs", ["jobs"], useJobEntriesStore, job.id, successToastContent, errorToastContent);
}


export function useDeleteContact(contact: InsertedContactEntry) {

    // TODO implement success undo action
    const successToastContent: ToastContent = {
        title: "Job deleted",
        description: `The contact at ${contact.company} has been successfully deleted.`,
        variant: "default",
        action: (
            <ToastAction altText="Undo">Undo</ToastAction>
        )
    }

    // TODO implement error retry action
    const errorToastContent: ToastContent = {
        title: "Deleting unsuccessful",
        description: `Please try again to delete the contact at ${contact.company}.`,
        variant: "destructive",
        action: (
            <ToastAction altText="Retry">Retry</ToastAction>
        )
    }

    return useDeleteData<InsertedContactEntry>("/api/v1/contacts", ["contacts"], useContactEntriesStore, contact.id, successToastContent, errorToastContent);
}
