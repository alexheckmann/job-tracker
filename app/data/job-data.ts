import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {ClientStateStore, InsertedContactEntry, InsertedJobEntry} from "@/lib/db/schema";
import {create} from "zustand";

export function useJobData() {
    return useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            return await axios.get<{jobs: InsertedJobEntry[] }>('/api/v1/jobs').then((res) => res.data.jobs)
        }
    });
}

export function useContactData() {
    return useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
            return await axios.get<{contacts: InsertedContactEntry[]}>('/api/v1/contacts').then((res) => res.data.contacts)
        }
    });
}

export const useJobEntriesStore = create<ClientStateStore<InsertedJobEntry[]>>((set) => ({
    data: [] as InsertedJobEntry[],
    setData: (data) => set({data: data})
}))

export const useContactEntriesStore = create<ClientStateStore<InsertedContactEntry[]>>((set) => ({
    data: [] as InsertedContactEntry[],
    setData: (data) => set({data: data})
}))

export const useJobCreationDialogStore = create<ClientStateStore<boolean>>(set => ({
    data: false,
    setData: (data) => set({data: data})
}));

export const useContactCreationDialogStore = create<ClientStateStore<boolean>>(set => ({
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

