"use client"

import {CardContent} from "@/components/ui/card";
import {DataTable} from "@/components/data-table";
import {jobTrackerColumns} from "@/app/data/job-columns";
import {useJobData, useJobEntriesStore} from "@/app/data/use-get-data";
import {useEffect} from "react";

export function JobTable() {

    const {data: fetchedJobData, isLoading: isLoadingJobData, isFetched: isJobDataFetched} = useJobData()
    const {data: jobData, setData: setJobData} = useJobEntriesStore()

    useEffect(() => {
        if (isJobDataFetched) {
            setJobData(fetchedJobData!)
        }
    }, [isJobDataFetched, fetchedJobData])

    return <CardContent className={"h-[75vh]"}>
        {isLoadingJobData ? "Loading..." :
            <DataTable className={"h-[70vh] overflow-auto"} data={jobData} columns={jobTrackerColumns}/>
        }
    </CardContent>;
}
