import {StoreApi, UseBoundStore} from "zustand";
import {ClientStateStore, InsertedJobEntry, JobEntry} from "@/lib/db/schema";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {ToastContent, TypeHasIdAndLastUpdate} from "@/app/data/use-delete-data";
import {useJobEntriesStore} from "@/app/data/job-data";
import {ToastAction} from "@/components/ui/toast";

export function useCreateData<S, T extends TypeHasIdAndLastUpdate>(apiEndpoint: string,
                                                                   dataKey: string[],
                                                                   useClientState: UseBoundStore<StoreApi<ClientStateStore<T[]>>>,
                                                                   successToastContent: ToastContent,
                                                                   errorToastContent: ToastContent,
                                                                   setUiState?: (data: any) => void,
                                                                   uiStateToSet?: any) {
    const {data: clientData, setData: setClientData} = useClientState();
    const queryClient = useQueryClient();

    const {mutate: mutateData, isPending} = useMutation({
        mutationFn: async (dataToUpdate: S) => {
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

            setClientData([...clientData, data])

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

export function useCreateJob(job: JobEntry, setUiState?: (data: any) => void) {

    // TODO implement success undo action
    const successToastContent: ToastContent = {
        title: "Job added",
        description: `The job at ${job.company} has been added.`,
        variant: "default",
        action: (
            <ToastAction altText={"Undo"}>Undo</ToastAction>
        )
    }

    // TODO implement error retry action
    const errorToastContent: ToastContent = {
        title: "Failed to add job",
        description: `The job at ${job.company} could not be added; please retry.`,
        variant: "destructive",
        action: (
            <ToastAction altText={"Retry"}>Retry</ToastAction>
        )
    }

    return useCreateData<JobEntry, InsertedJobEntry>('/api/v1/jobs', ['jobs'], useJobEntriesStore, successToastContent, errorToastContent, setUiState, false)
}
