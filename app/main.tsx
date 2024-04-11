"use client"

import Navbar from "@/components/navbar";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";
import {Toaster} from "@/components/ui/toaster";

interface MainProps {
    children: ReactNode
}

export default function Main({children}: MainProps) {

    const queryClient = new QueryClient()

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Navbar/>
                {children}
                <Toaster/>
            </QueryClientProvider>
        </>
    );
}
