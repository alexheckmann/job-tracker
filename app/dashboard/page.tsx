"use client"

import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {JobTable} from "@/app/dashboard/job-table";
import {useSession} from "next-auth/react";
import FullPageCard from "@/components/full-page-card";

export default function Home() {

    const {status} = useSession()

    return (
        <FullPageCard>
            <CardHeader className="flex flex-row items-center p-5 pb-0 md:p-6">
                <div className="grid gap-2">
                    <CardTitle>Job Tracker</CardTitle>
                    <CardDescription>
                        An overview of all your job applications.
                    </CardDescription>
                </div>
                {/*
                        <Button asChild size="sm" className="ml-auto gap-1">
                            <Link href="#">
                                <ChevronRight className="h-4 w-4"/>
                                View Current
                            </Link>
                        </Button>
                        */}
            </CardHeader>
            {status === "authenticated" && <JobTable/>}
        </FullPageCard>
    )
}

