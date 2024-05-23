"use client"

import {Column, ColumnDef, Row} from "@tanstack/react-table"
import {ChevronsUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useEffect} from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {HoverTooltip, LinkHoverTooltip} from "@/components/hover-tooltip";
import {formatDate} from "@/lib/formatDate";
import {format} from "date-fns";
import {OpenLinkButton} from "@/components/open-link-button";
import {Interview} from "@/lib/models/interview";
import {InterviewRowActions} from "@/app/interviews/interview-row-actions";
import {Badge} from "@/components/ui/badge";

// function that returns the first n characters of a string
function truncateString(str: string, num: number) {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...'
}

export const interviewColumns: ColumnDef<Interview>[] = [
    {
        accessorKey: "company",
        header: ({column}: { column: Column<Interview> }) => {
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
        accessorKey: "date",
        header: ({column}: { column: Column<Interview> }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
                column.toggleSorting(column.getIsSorted() !== "asc")
            }, []);

            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ChevronsUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}: { row: Row<Interview> }) => {
            const date = row.getValue<Date>("date")
            return (
                <HoverTooltip hoverText={`Last updated on ${format(date, "dd/MM/yyyy")}`} asChild>
                    <span>{formatDate(date)}</span>
                </HoverTooltip>
            );

        },
    },
    {
        accessorKey: "type",
        header: ({column}: { column: Column<Interview> }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <ChevronsUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },

        cell: ({row}: { row: Row<Interview> }) => {
            return (
                <Badge>{row.getValue("type")}</Badge>
            );
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
        cell: ({row}: { row: Row<Interview> }) => {
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
        accessorKey: "notes",
        header: () => {
            return (
                <span className={"px-4"}>
                    Notes
                </span>
            )
        },
        cell: ({row}: { row: Row<Interview> }) => {
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
        cell: ({row}: { row: Row<Interview> }) => {
            return (
                <HoverTooltip hoverText={"More actions"}>
                    <InterviewRowActions row={row}/>
                </HoverTooltip>
            )
        },
    },
]
