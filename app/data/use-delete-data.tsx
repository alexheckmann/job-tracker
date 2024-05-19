import {StoreApi, UseBoundStore} from "zustand";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {useContactEntriesStore, useJobEntriesStore} from "@/app/data/use-get-data";
import {Contact} from "@/lib/models/contact";
import {Job} from "@/lib/models/job";
import {ClientStateStore} from "@/lib/models/client-state-store";
import {ToastContent} from "@/app/data/toast-content";

export interface TypeHasIdAndLastUpdate {
    _id?: any,
    lastUpdate: any
}

export function useDeleteData<T extends TypeHasIdAndLastUpdate>(apiEndpoint: string,
                                                                dataKey: string[],
                                                                useClientState: UseBoundStore<StoreApi<ClientStateStore<T[]>>>,
                                                                id: any,
                                                                successToastContent: ToastContent,
                                                                errorToastContent: ToastContent) {
    const {data: clientData, setData: setClientData} = useClientState();
    const queryClient = useQueryClient();

    const {mutate: mutateData, isPending} = useMutation({
        mutationFn: async () => {
            await axios.delete(`${apiEndpoint}/${id}`);
        },
        onMutate: async () => {
            await queryClient.cancelQueries({queryKey: dataKey});
            const previousData = queryClient.getQueryData<T[]>(dataKey);
            queryClient.setQueryData(dataKey, clientData);
            return {previousData};
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: dataKey});

            const index = clientData.findIndex(item => item._id === id);

            if (index !== -1) {
                const updatedClientData = clientData.toSpliced(index, 1)
                setClientData(updatedClientData)
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
        },
    });

    return {mutateData, isPending};
}

export function useDeleteJob(job: Job) {

    // TODO implement success undo action
    const successToastContent: ToastContent = {
        title: "Job deleted",
        description: `The job at ${job.company} has been successfully deleted.`,
        variant: "default",
        // action: (
        //    <ToastAction altText="Undo">Undo</ToastAction>
        //)
    }

    // TODO implement error retry action
    const errorToastContent: ToastContent = {
        title: "Deleting unsuccessful",
        description: `Please try again to delete the job at ${job.company}.`,
        variant: "destructive",
        //action: (
        //    <ToastAction altText="Retry">Retry</ToastAction>
        //)
    }

    return useDeleteData<Job>("/api/v1/jobs", ["jobs"], useJobEntriesStore, job._id, successToastContent, errorToastContent);
}


export function useDeleteContact(contact: Contact) {

    // TODO implement success undo action
    const successToastContent: ToastContent = {
        title: "Job deleted",
        description: `The contact at ${contact.company} has been successfully deleted.`,
        variant: "default",
        //action: (
        //    <ToastAction altText="Undo">Undo</ToastAction>
        //)
    }

    // TODO implement error retry action
    const errorToastContent: ToastContent = {
        title: "Deleting unsuccessful",
        description: `Please try again to delete the contact at ${contact.company}.`,
        variant: "destructive",
        //action: (
        //    <ToastAction altText="Retry">Retry</ToastAction>
        //)
    }

    return useDeleteData<Contact>("/api/v1/contacts", ["contacts"], useContactEntriesStore, contact._id, successToastContent, errorToastContent);
}
