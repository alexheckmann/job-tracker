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
import {useEffect} from "react";
import {InsertedContactEntry} from "@/lib/db/schema";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {useDeleteContact} from "@/app/data/use-delete-data";
import Link from "next/link";
import {HoverTooltip} from "@/components/hover-tooltip";
import {DeleteIcon, EditIcon, LoadingIcon, MailIcon, MoreIcon, OpenLinkIcon, SortIcon} from "@/components/icons";
import {formatDate} from "@/lib/formatDate";
import {format} from "date-fns";

function RowActions({row}: { row: Row<InsertedContactEntry> }) {
    const contact = row.original

    const {mutateData: mutateContacts, isPending: isDeletingContact} = useDeleteContact(contact);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" disabled={isDeletingContact}>
                    {isDeletingContact ?
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
                                  onClick={() => mutateContacts()}>
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

export const contactColumns: ColumnDef<InsertedContactEntry>[] = [
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <SortIcon className="ml-2"/>
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
        accessorKey: "role",
        header: () => {
            return (
                <span className={"px-4"}>
                    Role
                </span>
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
        accessorKey: "linkedin",
        header: () => {
            return (
                <span className={"px-4"}>
                    LinkedIn
                </span>
            )
        },
        cell: ({row}) => {
            return row.getValue("linkedin") ?
                <Button variant={"link"} className={"px-0 gap-2"}>
                    <Link href={row.getValue("linkedin")} target={"_blank"}>
                        Go to LinkedIn
                    </Link>
                    <OpenLinkIcon className={"h-3 w-3"}/>
                </Button>
                :
                null
        },
    },
    {
        accessorKey: "phone",
        header: () => {
            return (
                <span className={"px-4"}>
                    Number
                </span>
            )
        },
    },
    {
        accessorKey: "email",
        header: () => {
            return (
                <span className={"px-4"}>
                    Email
                </span>
            )
        },
        cell: ({row}) => {
            return row.getValue("email") ?
                <MailIcon/> :
                null
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
            const date = row.getValue<Date>("lastUpdate")
            return (
                <HoverTooltip displayText={formatDate(date)} hoverText={`Last updated on ${format(date, "dd/MM/yyyy")}.`}/>
            );
        },
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
