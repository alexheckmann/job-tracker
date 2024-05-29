"use client"

import {Column, ColumnDef, Row} from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import {useEffect} from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {HoverTooltip, LinkHoverTooltip} from "@/components/hover-tooltip";
import {format} from "date-fns";
import {formatDate} from "@/lib/format-date";
import {OpenLinkButton} from "@/components/open-link-button";
import {Contact} from "@/lib/models/contact";
import {ContactRowActions} from "@/app/contacts/contact-row-actions";
import {SortIcon} from "@/components/icons";
import {truncateString} from "@/lib/truncate-string";

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
                    <SortIcon className="ml-2"/>
                </Button>
            )
        },
        size: 100,
        cell: ({row}: { row: Row<Contact> }) => {
            const name = row.getValue<string>("name")
            return (
                <span className={"text-nowrap"}>
                    {name}
                </span>
            )
        }
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
                    <SortIcon className="ml-2"/>
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
                    <SortIcon className="ml-2"/>
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
        cell: ({row}: { row: Row<Contact> }) => {
            const phoneNumber = row.getValue<string>("phone")
            return (
                phoneNumber &&
                <span className={"text-nowrap"}>
                    {phoneNumber}
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
                    <SortIcon className="ml-2"/>
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
