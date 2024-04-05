"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import StatusBadge from "@/app/components/status-badge";
import {ChevronDown} from "lucide-react";
import {ApplicationStatus} from "@/lib/db/schema";
import {Row} from "@tanstack/react-table";
import {InsertedJobEntry} from "@/app/components/job-creation-dialog-content";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {useState} from "react";

interface StatusDropdownProps {
    row: Row<InsertedJobEntry>,
}

const statuses = ApplicationStatus["_type"]

async function handleStatusChange(row: Row<InsertedJobEntry>, newStatus: typeof statuses) {
    try {
        const updatedJob = await axios.put<InsertedJobEntry>(`/api/v1/jobs/${row.original.id}`,
            {...row.original, status: newStatus})
            .then((res) => res.data)
            .then((data) => ({...data, lastUpdate: new Date(data.lastUpdate)}));
        toast({
            title: "Status updated",
            description: `The status of the job at ${row.getValue("company")} has been successfully updated to ${newStatus}.`
        });
    } catch (error) {
        console.error(error);
        toast({
            title: "Updating status unsuccessful",
            description: `Please try again to update the status of the job at ${row.getValue("company")} from ${row.getValue("status")} to ${newStatus}.`
        });
    }
}

export function StatusDropdown({row}: StatusDropdownProps) {
    const [status, setStatus] = useState(row.original.status)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={"inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"}>
                <StatusBadge status={status}>
                    <ChevronDown className={"h-4 w-4"}/>
                </StatusBadge>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
                {ApplicationStatus.options.map((status) => (
                    <DropdownMenuItem key={status} onClick={async () => {
                        await handleStatusChange(row, status)
                        setStatus(status)
                    }}>
                        {status}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
