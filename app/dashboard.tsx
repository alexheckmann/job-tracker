"use client"

import Link from "next/link"
import {ArrowUpRight} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {DataTable} from "@/components/data-table";
import {jobTrackerColumns} from "@/app/data/columns";
import {useJobEntriesStore, useJobData} from "@/app/data/job-data";
import {useEffect} from "react";
import {Toaster} from "@/components/ui/toaster";


export default function Dashboard() {

    const {data: fetchedJobData, isLoading: isLoadingJobData, isFetched: isJobDataFetched} = useJobData()
    const {data: jobData, setData: setJobData} = useJobEntriesStore()

    useEffect(() => {
        if (isJobDataFetched) {
            setJobData(fetchedJobData!)
        }
    }, [isJobDataFetched, fetchedJobData])

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
                    <CardContent className={"h-[75vh]"}>
                        {isLoadingJobData ? "Loading..." :
                            <DataTable className={"h-[70vh] overflow-auto"} data={jobData} columns={jobTrackerColumns}/>
                        }
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
