import {StoreApi, UseBoundStore} from "zustand";
import {ClientStateStore, InsertedJobEntry} from "@/lib/db/schema";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {useJobEntriesStore} from "@/app/data/job-data";

interface ToastContent {
    title: string
    description: string
    variant: "destructive" | "default"
}

interface TypeHasId {
    id: any
}

export function useDeleteData<T extends TypeHasId>(apiEndpoint: string,
                                                   dataKey: string[],
                                                   useClientState: UseBoundStore<StoreApi<ClientStateStore<T[]>>>,
                                                   id: any,
                                                   successToastContent: ToastContent,
                                                   errorToastContent: ToastContent) {
    const {data, setData} = useClientState();

    const queryClient = useQueryClient();
    const {mutate: mutateData} = useMutation({
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

    return mutateData;
}

export function useDeleteJob(job: InsertedJobEntry) {

    const successToastContent: ToastContent = {
        title: "Job deleted",
        description: `The job at ${job.company} has been successfully deleted.`,
        variant: "default"
    }

    const errorToastContent: ToastContent = {
        title: "Deleting unsuccessful",
        description: `Please try again to delete the job at ${job.company}.`,
        variant: "destructive"
    }

    return useDeleteData<InsertedJobEntry>("/api/v1/jobs", ["jobs"], useJobEntriesStore, job.id, successToastContent, errorToastContent);
}
