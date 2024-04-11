import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {ClientStateStore, InsertedJobEntry} from "@/lib/db/schema";
import {create} from "zustand";

export function useJobData() {
    return useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            return await axios.get<{jobs: InsertedJobEntry[] }>('/api/v1/jobs').then((res) => res.data.jobs)
        }
    });
}

export const useJobEntriesStore = create<ClientStateStore<InsertedJobEntry[]>>((set) => ({
    data: [] as InsertedJobEntry[],
    setData: (data) => set({data: data})
}))

export const useJobCreationDialogStore = create<ClientStateStore<boolean>>(set => ({
    data: false,
    setData: (data) => set({data: data})
}));

export const roleData = [
    "AI Engineer",
    "Data Engineer",
    "Software Engineer"
]

export const cityData = [
    "London, United Kingdom",
    "Barcelona, Spain",
    "Remote, United Kingdom",
    "Remote, Spain",
    "Remote, Germany",
]

