import {StoreApi, UseBoundStore} from "zustand";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {useContactEntriesStore, useInterviewEntriesStore, useJobEntriesStore} from "@/app/data/use-get-data";
import {Contact} from "@/lib/models/contact";
import {Job} from "@/lib/models/job";
import {ClientStateStore} from "@/lib/models/client-state-store";
import {ToastContent} from "@/lib/models/toast-content";
import {Interview} from "@/lib/models/interview";

export function useCreateData<T extends Record<string, unknown>>(apiEndpoint: string,
                                 dataKey: string[],
                                 useClientState: UseBoundStore<StoreApi<ClientStateStore<T[]>>>,
                                 successToastContent: ToastContent,
                                 errorToastContent: ToastContent,
                                 setUiState?: (data: any) => void,
                                 uiStateToSet?: any) {
    const {data: clientData, setData: setClientData} = useClientState();
    const queryClient = useQueryClient();

    const {mutate: mutateData, isPending} = useMutation({
        mutationFn: async (dataToUpdate: T) => {
            return await axios.post<T>(`${apiEndpoint}`, {...dataToUpdate})
                .then((res) => res.data)
        },
        onMutate: async () => {
            await queryClient.cancelQueries({queryKey: dataKey})
            const previousData = queryClient.getQueryData<T[]>(dataKey)
            queryClient.setQueryData(dataKey, clientData)
            return {previousData}
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({queryKey: dataKey});

            setClientData([data, ...clientData])

            if (!!setUiState) {
                setUiState(uiStateToSet)
            }

            toast({
                title: successToastContent.title,
                description: successToastContent.description,
                variant: successToastContent.variant,
                action: successToastContent.action
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

export function useCreateJob(job: Job, setUiState?: (data: any) => void, uiStateToSet?: any) {

    // TODO implement success undo action
    const successToastContent: ToastContent = {
        title: "Job added",
        description: `The job at ${job.company} has been added.`,
        variant: "default",
        //action: (
        //    <ToastAction altText={"Undo"}>Undo</ToastAction>
        //)
    }

    // TODO implement error retry action
    const errorToastContent: ToastContent = {
        title: "Failed to add job",
        description: `The job at ${job.company} could not be added; please retry.`,
        variant: "destructive",
        //action: (
        //    <ToastAction altText={"Retry"}>Retry</ToastAction>
        //)
    }

    return useCreateData<Job>('/api/v1/jobs', ['jobs'], useJobEntriesStore, successToastContent, errorToastContent, setUiState, uiStateToSet)
}

export function useCreateInterview(interview: Interview, setUiState?: (data: any) => void, uiStateToSet?: any) {

    // TODO implement success undo action
    const successToastContent: ToastContent = {
        title: "Job added",
        description: `The job at ${interview.company} has been added.`,
        variant: "default",
        //action: (
        //    <ToastAction altText={"Undo"}>Undo</ToastAction>
        //)
    }

    // TODO implement error retry action
    const errorToastContent: ToastContent = {
        title: "Failed to add interview",
        description: `The job at ${interview.company} could not be added; please retry.`,
        variant: "destructive",
        //action: (
        //    <ToastAction altText={"Retry"}>Retry</ToastAction>
        //)
    }

    return useCreateData<Interview>('/api/v1/interviews', ['interviews'], useInterviewEntriesStore, successToastContent, errorToastContent, setUiState, uiStateToSet)
}

export function useCreateContact(contact: Contact, setUiState?: (data: any) => void, uiStateToSet?: any) {

    // TODO implement success undo action
    const successToastContent: ToastContent = {
        title: "Contact added",
        description: `The contact at ${contact.company} has been added.`,
        variant: "default",
        //action: (
        //    <ToastAction altText={"Undo"}>Undo</ToastAction>
        //)
    }

    // TODO implement error retry action
    const errorToastContent: ToastContent = {
        title: "Failed to add contact",
        description: `The contact at ${contact.company} could not be added; please retry.`,
        variant: "destructive",
        //action: (
        //    <ToastAction altText={"Retry"}>Retry</ToastAction>
        //)
    }

    return useCreateData<Contact>('/api/v1/contacts', ['contacts'], useContactEntriesStore, successToastContent, errorToastContent, setUiState, uiStateToSet)
}
