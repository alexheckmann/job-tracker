"use client"

import {CardContent} from "@/components/ui/card";
import {ColumnFilterOption, DataTable} from "@/components/data-table";
import {jobTrackerColumns} from "@/app/dashboard/job-columns";
import {useJobData, useJobEntriesStore, useLocationsStore, useRolesStore} from "@/app/data/use-get-data";
import {useEffect} from "react";
import {ApplicationStatus} from "@/lib/models/job";


export function JobTable() {

    const {data: fetchedJobData, isLoading: isLoadingJobData, isFetched: isJobDataFetched} = useJobData()
    const {data: jobData, setData: setJobData} = useJobEntriesStore()
    const {data: roles} = useRolesStore()
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
            columnName: "role",
            type: "select",
            label: "Roles",
            initialValues: roles
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
    }, [isJobDataFetched, fetchedJobData])

    return (
        <CardContent className={"h-[70dvh] p-5 pt-3 md:px-6 md:pb-6"}>
            <DataTable className={"h-[60dvh] overflow-auto"}
                       isLoading={isLoadingJobData}
                       data={jobData}
                       columns={jobTrackerColumns}
                       columnFilterOptions={filterColumns}/>

        </CardContent>
    );
}
