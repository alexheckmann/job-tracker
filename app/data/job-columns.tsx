"use client"

import {Column, ColumnDef, Row} from "@tanstack/react-table"
import {ChevronsUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {StatusDropdown} from "@/components/status-dropdown";
import {useEffect} from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {HoverTooltip} from "@/components/hover-tooltip";
import {formatDate} from "@/lib/formatDate";
import {format} from "date-fns";
import {BooleanStatusIcon} from "@/components/boolean-status-icon";
import {OpenLinkButton} from "@/components/open-link-button";

import {Job} from "@/lib/models/job";
import {JobRowActions} from "@/app/data/job-row-actions";
import {FavoriteButton} from "@/components/favorite-button";

// function that returns the first n characters of a string
function truncateString(str: string, num: number) {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...'
}

export const jobTrackerColumns: ColumnDef<Job>[] = [
    {
        accessorKey: "isFavorite",
        header: ({column}: { column: Column<Job> }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <ChevronsUpDown className="ml-4 h-4 w-4"/>
                </Button>
            )
        },

        cell: ({row}: { row: Row<Job> }) => {
            return (
                <HoverTooltip hoverText={"Add to favorites"}>
                    <FavoriteButton job={row.original}/>
                </HoverTooltip>
            )
        },

        size: 20,
        enableResizing: false
    },
    {
        accessorKey: "role",
        header: ({column}: { column: Column<Job> }) => {
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
        header: ({column}: { column: Column<Job> }) => {
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
        header: ({column}: { column: Column<Job> }) => {
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
        cell: ({row}: { row: Row<Job> }) => {
            const date = row.getValue<Date>("lastUpdate")
            return (
                <HoverTooltip hoverText={`Last updated on ${format(date, "dd/MM/yyyy")}`} asChild>
                    <span>{formatDate(date)}</span>
                </HoverTooltip>
            );

        },
    },
    {
        accessorKey: "status",
        header: ({column}: { column: Column<Job> }) => {
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

        cell: ({row}: { row: Row<Job> }) => {
            return <StatusDropdown row={row}/>;
        },
    },
    {
        accessorKey: "exactTitle",
        header: ({column}: { column: Column<Job> }) => {
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
        header: ({column}: { column: Column<Job> }) => {
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
        accessorKey: "link",
        header: () => {
            return (
                <span className={"px-4"}>
                    Link
                </span>
            )
        },
        cell: ({row}: { row: Row<Job> }) => {
            return (
                <HoverTooltip hoverText={"Open job description"}>
                    {row.getValue("link") ?
                        <OpenLinkButton href={row.getValue("link")} type={"link"}/> : null}
                </HoverTooltip>

            )
        },
    },
    {
        accessorKey: "salary",
        header: ({column}: { column: Column<Job> }) => {
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
        accessorKey: "isReferral",

        header: ({column}: { column: Column<Job> }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Referral?
                    <ChevronsUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },

        cell: ({row}: { row: Row<Job> }) => {
            return (
                <HoverTooltip hoverText={"Submitted by referral"} asChild>
                    <BooleanStatusIcon bool={row.getValue<boolean>("isReferral")}/>
                </HoverTooltip>
            )
        },

        size: 20,
        enableResizing: false
    },
    {
        accessorKey: "isRecruiter",

        header: ({column}: { column: Column<Job> }) => {
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

        cell: ({row}: { row: Row<Job> }) => {
            return <BooleanStatusIcon bool={row.getValue<boolean>("isRecruiter")}/>
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
        cell: ({row}: { row: Row<Job> }) => {
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
        cell: ({row}: { row: Row<Job> }) => {
            return (
                <HoverTooltip hoverText={"More actions"}>
                    <JobRowActions row={row}/>
                </HoverTooltip>
            )
        },
    },
]
