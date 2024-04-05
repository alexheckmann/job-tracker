"use client"

import {ColumnDef, Row} from "@tanstack/react-table"
import {ArrowUpDown, CheckSquare, MoreHorizontal, Trash, XSquare} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {InsertedJobEntry} from "@/app/components/job-creation-dialog-content";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {useJobEntriesStore} from "@/app/data/job-data";
import StatusBadge from "@/app/components/status-badge";
import {formatDate} from "@/lib/formatDate";

function RowActions({row}: { row: Row<InsertedJobEntry> }) {
    const job = row.original

    const {data: jobData, setData: setJobData} = useJobEntriesStore()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuItem className={"gap-2"} color={"danger"}
                                  onClick={async () => {

                                      try {
                                          await axios.delete("/api/v1/jobs", {data: {id: job.id}})

                                          jobData.forEach((jobEntry, index) => {
                                              if (jobEntry.id === job.id) {
                                                  jobData.splice(index, 1)
                                              }
                                          })

                                          setJobData([...jobData])

                                          toast({
                                              title: "Job deleted",
                                              description: `The job at ${job.company} has been successfully deleted.`
                                          })
                                      } catch (error) {
                                          console.error(error)
                                          toast({
                                              title: "Deleting unsuccessful",
                                              description: `Please try again to delete the job at ${job.company}.`
                                          })
                                      }
                                  }}>
                    <Trash className={"h-4 w-4"}/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const jobTrackerColumns: ColumnDef<InsertedJobEntry>[] = [
    {
        accessorKey: "role",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        size: 100
    },
    {
        accessorKey: "company",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Company
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "lastUpdate",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Updated
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            return formatDate(row.getValue("lastUpdate"))
        },
    },
    {
        accessorKey: "status",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },

        cell: ({row}) => {
            return <StatusBadge status={row.getValue("status")}/>
        },
    },
    {
        accessorKey: "exactTitle",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Job title
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "location",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Location
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "country",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Country
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "salary",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Salary
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "isFavorite",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Favorite?
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },

        cell: ({row}) => {
            return row.getValue("isFavorite") ? <CheckSquare className={"h-4 w-4 text-muted-foreground"}/> :
                <XSquare className={"h-4 w-4 text-muted-foreground"}/>
        },

        size: 20,
        enableResizing: false
    },
    {
        accessorKey: "isRecruiter",

        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Recruiter?
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },

        cell: ({row}) => {
            return row.getValue("isRecruiter") ? <CheckSquare className={"h-4 w-4 text-muted-foreground"}/> :
                <XSquare className={"h-4 w-4 text-muted-foreground"}/>
        },

        size: 20,
        enableResizing: false
    },
    {
        accessorKey: "notes",
        header: "Notes",
        enableResizing: false
    },
    {
        id: "actions",
        cell: ({row}) => {


            return (
                <RowActions row={row}/>
            )
        },
    },
]
