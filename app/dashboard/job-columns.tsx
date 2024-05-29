"use client"

import {Column, ColumnDef, Row} from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import {StatusDropdown} from "@/components/status-dropdown";
import {useEffect} from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {HoverTooltip, LinkHoverTooltip} from "@/components/hover-tooltip";
import {formatDate} from "@/lib/format-date";
import {format} from "date-fns";
import {BooleanStatusIcon} from "@/components/boolean-status-icon";
import {OpenLinkButton} from "@/components/open-link-button";

import {Job} from "@/lib/models/job";
import {JobRowActions} from "@/app/dashboard/job-row-actions";
import {FavoriteButton} from "@/components/favorite-button";
import {SortIcon} from "@/components/icons";
import {truncateString} from "@/lib/truncate-string";

export const jobTrackerColumns: ColumnDef<Job>[] = [
    {
        accessorKey: "isFavorite",
        header: ({column}: { column: Column<Job> }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <SortIcon className="ml-4"/>
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
                    <SortIcon className="ml-2"/>
                </Button>
            )
        },
        size: 100,
        cell: ({row}: { row: Row<Job> }) => {
            const role = row.getValue<string>("role")
            return (
                <span className={"text-nowrap"}>
                    {role}
                </span>
            )
        }
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
                    <SortIcon className="ml-2"/>
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
                    <SortIcon className="ml-2"/>
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
                    <SortIcon className="ml-2"/>
                </Button>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
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
                    <SortIcon className="ml-2"/>
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
                    <SortIcon className="ml-2"/>
                </Button>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
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
            const link = row.getValue<string>("link")

            return (
                link &&
                <LinkHoverTooltip hoverText={"Open job description"}>
                    <OpenLinkButton href={link} type={"link"} className={"mx-auto"}/>
                </LinkHoverTooltip>
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
                    <SortIcon className="ml-2"/>
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
                    <SortIcon className="ml-2"/>
                </Button>
            )
        },

        cell: ({row}: { row: Row<Job> }) => {
            const isReferral = row.getValue<boolean>("isReferral")
            return (
                isReferral &&
                <HoverTooltip hoverText={"Submitted by referral"} className={"cursor-default"}>
                    <BooleanStatusIcon bool={isReferral} className={"mx-auto"}/>
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
                    <SortIcon className="ml-2"/>
                </Button>
            )
        },

        cell: ({row}: { row: Row<Job> }) => {
            const isRecruiter = row.getValue<boolean>("isRecruiter")
            return (
                isRecruiter &&
                <HoverTooltip hoverText={"Application via an external recruitment agency"}
                              className={"cursor-default"}>
                    <BooleanStatusIcon bool={isRecruiter} className={"mx-auto"}/>
                </HoverTooltip>
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
