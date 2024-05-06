"use client"

import Navbar from "@/components/navbar/navbar";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";
import {Toaster} from "@/components/ui/toaster";
import {TooltipProvider} from "@/components/ui/tooltip";
import {SessionProvider} from "next-auth/react";

interface MainProps {
    children: ReactNode
}

export default function Main({children}: MainProps) {

    const queryClient = new QueryClient()

    return (
        <>
            <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <Navbar/>
                    {children}
                    <Toaster/>
                </TooltipProvider>
            </QueryClientProvider>
            </SessionProvider>
        </>
    );
}
