"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import StatusBadge from "@/components/status-badge";
import {ChevronDown} from "lucide-react";
import {Row} from "@tanstack/react-table";
import {ApplicationStatus, InsertedJobEntry} from "@/lib/db/schema";
import {useState} from "react";
import {useUpdateJob} from "@/app/data/use-update-data";

const statuses = ApplicationStatus["_type"]

interface StatusDropdownProps {
    row: Row<InsertedJobEntry>,
}

export function StatusDropdown({row}: StatusDropdownProps) {
    const job = row.original
    const [status, setStatus] = useState(job.status)
    const updateJobStatus = useUpdateJob({...job, status: status})

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={"inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"}>
                <StatusBadge status={status}>
                    <ChevronDown className={"h-4 w-4 ml-1"}/>
                </StatusBadge>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
                {ApplicationStatus.options.map((status) => (
                    <DropdownMenuItem key={status} className={"text-[13px]"}
                                      onClick={() => {
                                          updateJobStatus()
                                          setStatus(status)
                                      }}>
                        {status}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
