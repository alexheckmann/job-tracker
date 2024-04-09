import {StoreApi, UseBoundStore} from "zustand";
import {ClientStateStore, InsertedJobEntry} from "@/lib/db/schema";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {ToastContent, TypeHasIdAndLastUpdate} from "@/app/data/use-delete-data";
import {useJobEntriesStore} from "@/app/data/job-data";
import {ToastAction} from "@/components/ui/toast";

export function useUpdateData<T extends TypeHasIdAndLastUpdate>(apiEndpoint: string,
                                                                dataKey: string[],
                                                                useClientState: UseBoundStore<StoreApi<ClientStateStore<T[]>>>,
                                                                id: any,
                                                                dataToUpdate: T,
                                                                successToastContent: ToastContent,
                                                                errorToastContent: ToastContent) {
    const {data, setData} = useClientState();
    const queryClient = useQueryClient();

    const {mutate: mutateData} = useMutation({
        mutationFn: async () => {
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
            queryClient.setQueryData(dataKey, data)
            return {previousData}
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: dataKey});
            const index = data.findIndex(item => item.id === dataToUpdate.id);

            if (index !== -1) {
                setData([
                    ...data.slice(0, index),
                    dataToUpdate,
                    ...data.slice(index + 1),
                ]);
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

    return mutateData;
}

export function useUpdateJob(job: InsertedJobEntry) {

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

    return useUpdateData<InsertedJobEntry>('/api/v1/jobs', ['jobs'], useJobEntriesStore, job.id, job, successToastContent, errorToastContent)
}
