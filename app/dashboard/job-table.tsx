"use client"

import {CardContent} from "@/components/ui/card";
import {ColumnFilterOption, DataTable} from "@/components/data-table";
import {jobTrackerColumns} from "@/app/dashboard/job-columns";
import {useJobData, useJobEntriesStore, useLocationsStore} from "@/app/data/use-get-data";
import {useEffect} from "react";
import {ApplicationStatus} from "@/lib/models/job";
import {useSession} from "next-auth/react";


export function JobTable() {

    const {data: session} = useSession()
    const {data: fetchedJobData, isLoading: isLoadingJobData, isFetched: isJobDataFetched} = useJobData()
    const {data: jobData, setData: setJobData} = useJobEntriesStore()
    const {data: locations} = useLocationsStore()

    const filterColumns: ColumnFilterOption[] = [
        {
            columnName: "company",
            type: "input",
            label: "Search for a company..."
        },
        {
            columnName: "isRecruiter",
            type: "button",
            label: "HR",
            filterValue: false
        },
        {
            columnName: "isFavorite",
            type: "button",
            label: "Starred",
            filterValue: true
        },
        {
            columnName: "status",
            type: "select",
            label: "Status",
            initialValues: ApplicationStatus.options
        },
        {
            columnName: "location",
            type: "select",
            label: "Locations",
            initialValues: locations
        }
    ]

    useEffect(() => {
        if (isJobDataFetched) {
            setJobData(fetchedJobData!)
        }

        if (!filterColumns.some(columnFilter => columnFilter.columnName === "role")) {

            filterColumns.push({
                columnName: "role",
                type: "select",
                label: "Roles",
                initialValues: session?.user?.roles || []
            })
        }

    }, [isJobDataFetched, fetchedJobData, session?.user?.roles])

    return (
        <CardContent className={"h-[70dvh] p-5 pt-3 md:p-6"}>
            <DataTable className={"h-[60dvh] overflow-auto"}
                       isLoading={isLoadingJobData}
                       data={jobData}
                       columns={jobTrackerColumns}
                       columnFilterOptions={filterColumns}/>

        </CardContent>
    );
}
