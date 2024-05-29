"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";
import {DataTableColumnFilter} from "@/components/data-table-column-filter";
import {getEmptyArray} from "@/lib/get-empty-array";

export type ColumnFilterOption = {
    columnName: string,
    label: string,
} & ({
    type: "button",
    filterValue: string | boolean
} | {
    type: "input"
} | {
    type: "select",
    initialValues: string[]
})

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    className?: string,
    columnFilterOptions?: ColumnFilterOption[],
    isLoading?: boolean
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             className,
                                             columnFilterOptions,
                                             isLoading
                                         }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
        defaultColumn: {
            size: 5,
            minSize: 5,
            maxSize: 150
        }
    })

    return (
        <>
            <div className="flex flex-wrap items-center py-4 gap-2">
                {columnFilterOptions?.map((columnFilterOption, index) => {
                    const column = table.getColumn(columnFilterOption.columnName)
                    return (
                        <DataTableColumnFilter key={index} column={column} columnFilterOption={columnFilterOption}/>
                    )
                })}


            </div>
            <div className={cn("rounded-md border bg-white", className)}>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        // @ts-ignore
                                        <TableHead key={header.id} className={`px-0 w-[${header.getSize()}]`}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {!isLoading ?
                            table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} style={{width: cell.column.getSize()}}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                getEmptyArray(12).map((_, i) => (
                                    <TableRow key={i}>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} style={{width: column.size}}>
                                                <Skeleton className={"h-4"}/>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
