"use client"

import {ColumnDef, Row} from "@tanstack/react-table"
import {ChevronsUpDown, Loader2, Mail, MoreHorizontal, SquareArrowOutUpRight, SquarePen, Trash} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {formatDate} from "@/lib/formatDate";
import {useEffect} from "react";
import {InsertedContactEntry} from "@/lib/db/schema";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {format} from "date-fns";
import {useDeleteContact} from "@/app/data/use-delete-data";
import Link from "next/link";

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
                                  onClick={() => mutateContacts()}>
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
                    <ChevronsUpDown className="ml-2 h-4 w-4"/>
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
            return row.getValue("link") ?
                <Button variant={"link"} className={"px-0 gap-2"}>
                    <Link href={row.getValue("link")} target={"_blank"}>
                        Go to LinkedIn
                    </Link>
                    <SquareArrowOutUpRight className={"h-3 w-3"}/>
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
            return row.getValue("email") ? <Mail className={"h-4 w-4 text-muted-foreground"}/> :
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
        id: "actions",
        cell: ({row}) => {
            return (
                <RowActions row={row}/>
            )
        },
    },
]
