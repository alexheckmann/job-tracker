"use client"

import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useSession} from "next-auth/react";
import ContactTable from "@/app/contacts/contact-table";

export default function ContactsPage() {

    const {status} = useSession()

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 max-h-[88dvh]">
            <div className="grid gap-4 md:gap-8 bg-white max-h-[88dvh]">
                <Card className="max-w-full h-[88dvh] overflow-x-auto">
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Contacts</CardTitle>
                            <CardDescription>
                                Recent contacts relevant to your job search.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    {status === "authenticated" && <ContactTable/>}
                </Card>
            </div>
        </main>
    )
}
