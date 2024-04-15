"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import StatusBadge from "@/components/status-badge";
import {Row} from "@tanstack/react-table";
import {ApplicationStatus, InsertedJobEntry} from "@/lib/db/schema";
import {useState} from "react";
import {useUpdateJob} from "@/app/data/use-update-data";
import {DropdownIcon} from "@/components/icons";

const statuses = ApplicationStatus["_type"]

interface StatusDropdownProps {
    row: Row<InsertedJobEntry>,
}

export function StatusDropdown({row}: StatusDropdownProps) {
    const job = row.original
    const [status, setStatus] = useState(job.status)
    const {mutateData: updateJobStatus, isPending: isUpdatingStatus} = useUpdateJob(job, setStatus, status)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={isUpdatingStatus}
                className={"inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"}>
                <StatusBadge status={status} className={isUpdatingStatus ? "bg-background" : ""}>
                    <DropdownIcon className={"ml-1"}/>
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
