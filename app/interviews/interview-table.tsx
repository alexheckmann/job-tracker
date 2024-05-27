"use client"

import {CardContent} from "@/components/ui/card";
import {ColumnFilterOption, DataTable} from "@/components/data-table";
import {useInterviewData, useInterviewEntriesStore} from "@/app/data/use-get-data";
import {useEffect} from "react";
import {useSession} from "next-auth/react";
import {interviewColumns} from "@/app/interviews/interview-columns";

const filterColumns: ColumnFilterOption[] = []

export function InterviewTable() {

    const {data: session} = useSession()
    const {
        data: fetchedInterviewData,
        isLoading: isLoadingInterviewData,
        isFetched: isJobDataFetched
    } = useInterviewData()
    const {data: interviewData, setData: setInterviewData} = useInterviewEntriesStore()

    useEffect(() => {
        if (isJobDataFetched) {
            setInterviewData(fetchedInterviewData!)
        }

    }, [isJobDataFetched, fetchedInterviewData, session?.user?.locations])

    return (
        <CardContent className={"h-[70dvh] p-5 pt-3 md:p-6"}>
            <DataTable className={"h-[60dvh] overflow-auto"}
                       isLoading={isLoadingInterviewData}
                       data={interviewData}
                       columns={interviewColumns}
                       columnFilterOptions={filterColumns}/>

        </CardContent>
    );
}
