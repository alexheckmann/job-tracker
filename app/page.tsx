"use client"

import Dashboard from "@/app/dashboard";
import Navbar from "@/components/navbar";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export default function Home() {

    const queryClient = new QueryClient()


    return (
        <>
            <QueryClientProvider client={queryClient}>
                <div className="flex min-h-screen w-full flex-col">
                    <Navbar/>
                    <Dashboard/>
                </div>
            </QueryClientProvider>
        </>
    );
}
