"use client"

import {ColumnDef, Row} from "@tanstack/react-table"
import {CheckSquare, ChevronsUpDown, Loader2, MoreHorizontal, SquarePen, Trash, XSquare} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {formatDate} from "@/lib/formatDate";
import {StatusDropdown} from "@/components/status-dropdown";
import {useEffect} from "react";
import {InsertedJobEntry} from "@/lib/db/schema";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {format} from "date-fns";
import {useDeleteJob} from "@/app/data/use-delete-data";

function RowActions({row}: { row: Row<InsertedJobEntry> }) {
    const job = row.original

    const {mutateData: mutateJobs, isPending: isDeletingJob} = useDeleteJob(job);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" disabled={isDeletingJob}>
                    {isDeletingJob ?
                        <>
                            <span className="sr-only">Deleting entry</span>
                            <Loader2 className={"h-4 w-4 animate-spin"}/>
                        </>
                        :
                        <>
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </>
                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                {/* TODO implement edit dialog */}
                <DropdownMenuItem className={"gap-2"}>
                    <SquarePen className={"h-4 w-4"}/>
                    Edit
                </DropdownMenuItem>

                <DropdownMenuItem className={"gap-2"}
                                  onClick={() => mutateJobs()}>
                    <Trash className={"h-4 w-4"}/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// function that returns the first n characters of a string
function truncateString(str: string, num: number) {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...'
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
                    <ChevronsUpDown className="ml-2 h-4 w-4"/>
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
                    <ChevronsUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "lastUpdate",
        header: ({column}) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
                column.toggleSorting(column.getIsSorted() !== "asc")
            }, []);

            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Updated
                    <ChevronsUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            return (
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <span>{formatDate(row.getValue("lastUpdate"))}</span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-fit">
                        <div className="flex justify-between space-x-4">
                            <div className="space-y-1">
                                <p className="text-sm">
                                    Last updated on {format(row.getValue("lastUpdate"), "dd/MM/yyyy")}.
                                </p>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>

            );

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
                    <ChevronsUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },

        cell: ({row}) => {
            return <StatusDropdown row={row}/>;
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
                    <ChevronsUpDown className="ml-2 h-4 w-4"/>
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
                    <ChevronsUpDown className="ml-2 h-4 w-4"/>
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
                    <ChevronsUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "salary",
        header: ({column}) => {
            // TODO format salary as 50,000 GBP / 50,000-60,000 GBP
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Salary
                    <ChevronsUpDown className="ml-2 h-4 w-4"/>
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
                    <ChevronsUpDown className="ml-2 h-4 w-4"/>
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
                    Agency?
                    <ChevronsUpDown className="ml-2 h-4 w-4"/>
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
        header: ({column}) => {
            return (
                <span
                    //className={"w-[50px]"}
                >
                    Notes
                </span>
            )
        },
        cell: ({row}) => {
            const cellIsNotEmpty = row.getValue("notes") !== "";
            return (
                cellIsNotEmpty &&
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <span className="whitespace-nowrap truncate max-w-[50px]">{truncateString(row.getValue("notes"), 15)}</span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-fit">
                        <div className="flex justify-between space-x-4">
                            <div className="space-y-1">
                                <p className="text-sm whitespace-pre">
                                    {row.getValue("notes")}
                                </p>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            );
        },
        size: 20,
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
