"use client"

import {CardContent} from "@/components/ui/card";
import {DataTable, FilterColumnOption} from "@/components/data-table";
import {jobTrackerColumns} from "@/app/data/job-columns";
import {useJobData, useJobEntriesStore} from "@/app/data/use-get-data";
import {useEffect} from "react";
import {ApplicationStatus} from "@/lib/models/job";

const filterColumns: FilterColumnOption[] = [
    {
        name: "company",
        type: "input",
        label: "Search for a company..."
    },
    {
        name: "isRecruiter",
        type: "button",
        label: "HR",
        filterValue: false
    },
    {
        name: "status",
        type: "select",
        label: "Status",
        initialValues: ApplicationStatus.options
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

    return (
        <CardContent className={"h-[70dvh] p-5 pt-3 md:p-6"}>
            <DataTable className={"h-[60dvh] overflow-auto"}
                       isLoading={isLoadingJobData}
                       data={jobData}
                       columns={jobTrackerColumns}
                       filterColumnOptions={filterColumns}/>

        </CardContent>
    );
}
