"use client"

import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useSession} from "next-auth/react";
import ContactTable from "@/app/contacts/contact-table";
import FullPageCard from "@/components/full-page-card";

export default function ContactsPage() {

    const {status} = useSession()

    return (
        <FullPageCard>
            <CardHeader className="flex flex-row items-center p-5 pb-0 md:p-6">
                <div className="grid gap-2">
                    <CardTitle>Contacts</CardTitle>
                    <CardDescription>
                        Recent contacts relevant to your job search.
                    </CardDescription>
                </div>
            </CardHeader>
            {status === "authenticated" && <ContactTable/>}
        </FullPageCard>
    )
}
