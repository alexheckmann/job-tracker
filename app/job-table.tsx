"use client"

import {CardContent} from "@/components/ui/card";
import {DataTable, FilterColumnOption} from "@/components/data-table";
import {jobTrackerColumns} from "@/app/data/job-columns";
import {useJobData, useJobEntriesStore} from "@/app/data/use-get-data";
import {useEffect} from "react";

const filterColumns: FilterColumnOption[] = [
    {
        name: "company",
        type: "input",
        label: "Search for a company..."
    },
    {
        name: "status",
        type: "button",
        label: "Saved",
        filterValue: "saved"
    },
    {
        name: "isRecruiter",
        type: "button",
        label: "HR",
        filterValue: false
    }
]

export function JobTable() {

    const {data: fetchedJobData, isLoading: isLoadingJobData, isFetched: isJobDataFetched} = useJobData()
    const {data: jobData, setData: setJobData} = useJobEntriesStore()

    useEffect(() => {
        if (isJobDataFetched) {
            setJobData(fetchedJobData!)
        }
    }, [isJobDataFetched, fetchedJobData])

    return <CardContent className={"h-[70dvh]"}>
        {isLoadingJobData ? "Loading..." :
            <DataTable className={"h-[60dvh] overflow-auto"} data={jobData} columns={jobTrackerColumns}
                       filterColumnOptions={filterColumns}/>
        }
    </CardContent>;
}
