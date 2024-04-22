"use client"

import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {JobTable} from "@/app/job-table";
import {useSession} from "next-auth/react";

export default function Home() {

    const {status} = useSession()

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 max-h-[88vh]">
            <div className="grid gap-4 md:gap-8 bg-white max-h-[88vh]">
                <Card className="max-w-full h-[86vh] overflow-auto">
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Job Tracker</CardTitle>
                            <CardDescription>
                                Recent transactions from your store.
                            </CardDescription>
                        </div>
                        <Button asChild size="sm" className="ml-auto gap-1">
                            <Link href="#">
                                <ArrowUpRight className="h-4 w-4"/>
                                View Current
                            </Link>
                        </Button>
                    </CardHeader>
                    {status === "authenticated" && <JobTable/>}
                </Card>
            </div>
        </main>
    )
}

