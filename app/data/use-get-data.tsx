import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {create} from "zustand";
import {Contact} from "@/lib/models/contact";
import {Job} from "@/lib/models/job";
import {ClientStateStore} from "@/lib/models/client-state-store";

export function useJobData() {
    return useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            return await axios.get<{ jobs: Job[] }>('/api/v1/jobs').then((res) => res.data.jobs)
        }
    });
}

export function useContactData() {
    return useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
            return await axios.get<{
                contacts: Contact[]
            }>('/api/v1/contacts').then((res) => res.data.contacts)
        }
    });
}

export const useJobEntriesStore = create<ClientStateStore<Job[]>>((set) => ({
    data: [] as Job[],
    setData: (data) => set({data: data})
}))

export const useContactEntriesStore = create<ClientStateStore<Contact[]>>((set) => ({
    data: [] as Contact[],
    setData: (data) => set({data: data})
}))

export const useJobCreationDialogStore = create<ClientStateStore<boolean>>(set => ({
    data: false,
    setData: (data) => set({data: data})
}));

export const useJobEditDialogStore = create<ClientStateStore<boolean>>(set => ({
    data: false,
    setData: (data) => set({data: data})
}));

export const useContactCreationDialogStore = create<ClientStateStore<boolean>>(set => ({
    data: false,
    setData: (data) => set({data: data})
}));

export const useContactEditDialogStore = create<ClientStateStore<boolean>>(set => ({
    data: false,
    setData: (data) => set({data: data})
}));


