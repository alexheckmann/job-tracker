"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import StatusBadge from "@/components/status-badge";
import {Row} from "@tanstack/react-table";
import {ApplicationStatus, Job} from "@/lib/models/job";
import {useEffect, useState} from "react";
import {useUpdateJob} from "@/app/data/use-update-data";
import {DownIcon} from "@/components/icons";

interface StatusDropdownProps {
    row: Row<Job>,
}

export function StatusDropdown({row}: StatusDropdownProps) {
    const job = row.original
    const [status, setStatus] = useState(job.status)
    const {mutateData: updateJobStatus, isPending: isUpdatingStatus} = useUpdateJob(job, setStatus, status)

    useEffect(() => {
        setStatus(job.status)
    }, [job.status]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={isUpdatingStatus}
                                 className={"inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"}>
                <StatusBadge status={status} className={isUpdatingStatus ? "bg-background" : ""}>
                    <DownIcon className={"ml-1"}/>
                </StatusBadge>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
                {ApplicationStatus.options.map((status) => (
                    status !== job.status ?
                        <DropdownMenuItem key={status} className={"text-[13px]"}
                                          onClick={() => {
                                              updateJobStatus({...job, status: status, lastUpdate: new Date()})
                                              setStatus(status)
                                          }}>
                            {status}
                        </DropdownMenuItem> :
                        null
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
