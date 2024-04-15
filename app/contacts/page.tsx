"use client"

import {useContactData, useContactEntriesStore} from "@/app/data/job-data";
import {useEffect} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ContinueIcon} from "@/components/icons";
import {DataTable} from "@/components/data-table";
import {contactColumns} from "@/app/data/contact-columns";

export default function ContactsPage() {

    const {data: fetchedContactData, isLoading: isLoadingJobData, isFetched: isContactDataFetched} = useContactData()
    const {data: contactData, setData: setContactData} = useContactEntriesStore()

    useEffect(() => {
        if (isContactDataFetched) {
            setContactData(fetchedContactData!)
        }
    }, [isContactDataFetched, fetchedContactData])

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 max-h-[88vh]">
            <div className="grid gap-4 md:gap-8 bg-white max-h-[88vh]">
                <Card className="max-w-full h-[86vh] overflow-auto">
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Contacts</CardTitle>
                            <CardDescription>
                                Recent contacts relevant to your job search.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className={"h-[75vh]"}>
                        {isLoadingJobData ? "Loading..." :
                            <DataTable className={"h-[70vh] overflow-auto"} data={contactData} columns={contactColumns}/>
                        }
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
