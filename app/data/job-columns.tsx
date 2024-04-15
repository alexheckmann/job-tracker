"use client"

import {ColumnDef, Row} from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {StatusDropdown} from "@/components/status-dropdown";
import {useEffect} from "react";
import {InsertedJobEntry} from "@/lib/db/schema";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {useDeleteJob} from "@/app/data/use-delete-data";
import Link from "next/link";
import {LastUpdatedTooltip} from "@/components/last-updated-tooltip";
import {DeleteIcon, EditIcon, LoadingIcon, MoreIcon, NoIcon, OpenLinkIcon, SortIcon, YesIcon} from "@/components/icons";

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
                            <LoadingIcon/>
                        </>
                        :
                        <>
                            <span className="sr-only">Open menu</span>
                            <MoreIcon/>
                        </>
                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                {/* TODO implement edit dialog */}
                <DropdownMenuItem className={"gap-2"}>
                    <EditIcon/>
                    Edit
                </DropdownMenuItem>

                <DropdownMenuItem className={"gap-2"}
                                  onClick={() => mutateJobs()}>
                    <DeleteIcon/>
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
                    <SortIcon className={"ml-2"}/>
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
                    <SortIcon className={"ml-2"}/>
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
                    <SortIcon className={"ml-2"}/>
                </Button>
            )
        },
        cell: ({row}) => {
            return (
                <LastUpdatedTooltip date={row.getValue("lastUpdate")}/>
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
                    <SortIcon className={"ml-2"}/>
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
                    <SortIcon className={"ml-2"}/>
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
                    <SortIcon className={"ml-2"}/>
                </Button>
            )
        },
    },
    {
        accessorKey: "link",
        header: () => {
            return (
                <span className={"px-4"}>
                    Link
                </span>
            )
        },
        cell: ({row}) => {
            return row.getValue("link") ?
                <Button variant={"link"} className={"px-0 gap-2"}>
                    <Link href={row.getValue("link")} target={"_blank"}>
                        see job posting
                    </Link>
                    <OpenLinkIcon className={"h-3 w-3"}/>
                </Button>
                :
                null
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
                    <SortIcon className={"ml-2"}/>
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
                    <SortIcon className={"ml-2"}/>
                </Button>
            )
        },

        cell: ({row}) => {
            return row.getValue("isFavorite") ?
                <YesIcon/> :
                <NoIcon/>
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
                    <SortIcon className={"ml-2"}/>
                </Button>
            )
        },

        cell: ({row}) => {
            return row.getValue("isRecruiter") ?
                <YesIcon/> :
                <NoIcon/>
        },

        size: 20,
        enableResizing: false
    },
    {
        accessorKey: "notes",
        header: () => {
            return (
                <span className={"px-4"}>
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
                        <span
                            className="whitespace-nowrap truncate max-w-[50px]">{truncateString(row.getValue("notes"), 15)}</span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-fit max-w-[250px] md:max-w-[500px] max-h-[50svh] overflow-auto">
                        <div className="flex justify-between space-x-4">
                            <div className="space-y-1">
                                <p className="text-sm whitespace-pre-wrap">
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
