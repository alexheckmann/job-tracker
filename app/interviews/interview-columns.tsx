"use client"

import {Column, ColumnDef, Row} from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {HoverTooltip, LinkHoverTooltip} from "@/components/hover-tooltip";
import {formatDate} from "@/lib/format-date";
import {format} from "date-fns";
import {OpenLinkButton} from "@/components/open-link-button";
import {Interview} from "@/lib/models/interview";
import {InterviewRowActions} from "@/app/interviews/interview-row-actions";
import {Badge} from "@/components/ui/badge";
import {SortIcon} from "@/components/icons";
import {truncateString} from "@/lib/truncate-string";
import {Job} from "@/lib/models/job";

export const interviewColumns: ColumnDef<Interview>[] = [
    {
        accessorKey: "description",
        header: ({column}: {
            column: Column<Interview>
        }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Description
                    <SortIcon className="ml-2"/>
                </Button>
            )
        }
    },
    {
        accessorKey: "job",
        header: ({column}: {
            column: Column<Interview>
        }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Job
                    <SortIcon className="ml-2"/>
                </Button>
            )
        },
        cell: ({row}: {
            row: Row<Interview>
        }) => {
            const job = row.getValue<Job>("job")
            const jobLabel = job?.exactTitle ? `${job?.exactTitle} - ${job?.company}` : `${job?.role} - ${job?.company}`

            return (
                job &&
                <span>{jobLabel}</span>
            );
        },
        filterFn: (row, id, value) => {
            const job = row.getValue<Job>("job")
            const jobLabel = job ? (job?.exactTitle ? `${job?.exactTitle} - ${job?.company}` : `${job?.role} - ${job?.company}`) : ""
            return jobLabel.toLowerCase().includes(value.toLowerCase())
        }
    },
    {
        id: "Job description",
        cell: ({row}: {
            row: Row<Interview>
        }) => {
            const job: Job = row.getValue<Job>("job")
            return (
                job?.link &&
                <LinkHoverTooltip hoverText={"Open job description"}>
                    <OpenLinkButton href={job.link} type={"link"} className={"mx-auto"}/>
                </LinkHoverTooltip>
            );
        }
    },
    {
        accessorKey: "date",
        header: ({column}: {
            column: Column<Interview>
        }) => {

            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <SortIcon className="ml-2"/>
                </Button>
            )
        },
        cell: ({row}: {
            row: Row<Interview>
        }) => {
            const date: Date = row.getValue<Date>("date")

            return (
                <HoverTooltip hoverText={`${format(date, "dd/MM/yyyy")}`} asChild>
                    <span>{formatDate(date)}</span>
                </HoverTooltip>
            );

        },
    },
    {
        id: "Interview time",
        cell: ({row}: {
            row: Row<Interview>
        }) => {
            const startTime: string | undefined = row.original.startTime
            const endTime: string | undefined = row.original.endTime

            return (
                startTime &&
                <span>
                    {startTime && endTime ? `${startTime} - ${endTime}` : startTime}
                </span>
            )
        }
    },
    {
        accessorKey: "type",
        header: ({column}: {
            column: Column<Interview>
        }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <SortIcon className="ml-2"/>
                </Button>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },

        cell: ({row}: {
            row: Row<Interview>
        }) => {
            return (
                <Badge className={"text-nowrap"}>{row.getValue("type")}</Badge>
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
        cell: ({row}: {
            row: Row<Interview>
        }) => {
            const link = row.getValue<string>("link")

            return (
                link &&
                <LinkHoverTooltip hoverText={"Open interview link"}>
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
        cell: ({row}: {
            row: Row<Interview>
        }) => {
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
        cell: ({row}: {
            row: Row<Interview>
        }) => {
            return (
                <HoverTooltip hoverText={"More actions"}>
                    <InterviewRowActions row={row}/>
                </HoverTooltip>
            )
        },
    },
]
