"use client"

import Dashboard from "@/app/dashboard";
import Navbar from "@/app/components/navbar";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useJobCreationDialogStore} from "@/app/data/job-data";
import {Dialog} from "@/components/ui/dialog";

export default function Home() {

    const queryClient = new QueryClient()

    const {data: isJobCreationDialogOpen, setData: setIsJobCreationDialogOpen} = useJobCreationDialogStore()

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <div className="flex min-h-screen w-full flex-col">
                    <Dialog open={isJobCreationDialogOpen} onOpenChange={setIsJobCreationDialogOpen}>
                        <Navbar/>
                        <Dashboard/>
                    </Dialog>
                </div>
            </QueryClientProvider>
        </>
    );
}
