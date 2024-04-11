"use client"

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Navbar from "@/components/navbar";
import ContactsDashboard from "@/app/contacts/contacts-dashboard";

export default function ContactsPage() {
    const queryClient = new QueryClient()

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <div className="flex min-h-screen w-full flex-col">
                    <Navbar/>
                    <ContactsDashboard/>
                </div>
            </QueryClientProvider>
        </>
    );
}
