"use client"

import {Column, ColumnDef, Row} from "@tanstack/react-table"
import {ChevronsUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useEffect} from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {HoverTooltip, LinkHoverTooltip} from "@/components/hover-tooltip";
import {format} from "date-fns";
import {formatDate} from "@/lib/formatDate";
import {OpenLinkButton} from "@/components/open-link-button";

import {Contact} from "@/lib/models/contact";
import {ContactRowActions} from "@/app/contacts/contact-row-actions";

/**
 * Truncate a string to a certain length. Used as a workaround for the lack of ellipsis support in the table.
 * @param str the string to truncate
 * @param num the number of characters to truncate to
 * @returns the truncated string
 */
function truncateString(str: string, num: number) {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...'
}

export const contactColumns: ColumnDef<Contact>[] = [
    {
        accessorKey: "name",
        header: ({column}: { column: Column<Contact> }) => {
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
        header: ({column}: { column: Column<Contact> }) => {
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
        header: ({column}: { column: Column<Contact> }) => {
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
        cell: ({row}: { row: Row<Contact> }) => {
            const linkedin = row.getValue<string>("linkedin")
            return (
                linkedin &&
                <LinkHoverTooltip hoverText={"Open LinkedIn profile"}>
                    <OpenLinkButton href={linkedin} type={"linkedin"} className={"mx-auto"}/>
                </LinkHoverTooltip>
            )
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
        cell: ({row}: { row: Row<Contact> }) => {
            const email = row.getValue<string>("email")
            return (
                email &&
                <LinkHoverTooltip hoverText={`${email}`}>
                    <OpenLinkButton href={email} type={"email"} className={"mx-auto"}/>
                </LinkHoverTooltip>
            )
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
        cell: ({row}: { row: Row<Contact> }) => {
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
        header: ({column}: { column: Column<Contact> }) => {
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
        cell: ({row}: { row: Row<Contact> }) => {
            const date = row.getValue<Date>("lastUpdate")
            return (
                <HoverTooltip hoverText={`Last updated on ${format(date, "dd/MM/yyyy")}`} asChild>
                    <span>{formatDate(date)}</span>
                </HoverTooltip>
            );
        },
    },
    {
        id: "actions",
        cell: ({row}: { row: Row<Contact> }) => {
            return (
                <HoverTooltip hoverText={"More actions"}>
                    <ContactRowActions row={row}/>
                </HoverTooltip>
            )
        },
    },
]
