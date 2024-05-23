"use client"

import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {InterviewTable} from "@/app/interviews/interview-table";
import {useSession} from "next-auth/react";
import FullPageCard from "@/components/full-page-card";

export default function Home() {

    const {status} = useSession()

    return (
        <FullPageCard>
            <CardHeader className="flex flex-row items-center p-5 pb-0 md:p-6">
                <div className="grid gap-2">
                    <CardTitle>Interviews</CardTitle>
                    <CardDescription>
                        An overview of all your interviews.
                    </CardDescription>
                </div>
            </CardHeader>
            {status === "authenticated" && <InterviewTable/>}
        </FullPageCard>
    )
}

