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
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {Toggle} from "@/components/ui/toggle";

export interface FilterColumnOption {
    name: string,
    type: "button" | "input",
    label: string,
    filterValue?: string | boolean

}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    className?: string,
    filterColumnOptions?: FilterColumnOption[],
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             className,
                                             filterColumnOptions
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
            <div className="flex items-center py-4 gap-2">
                {filterColumnOptions?.map((filterColumnOption) => {
                    const column = table.getColumn(filterColumnOption.name)

                    if (filterColumnOption.type === "button") {
                        return (
                            <Toggle
                                key={filterColumnOption.name}
                                variant={"outline"}
                                onPressedChange={
                                    (pressed) => {
                                        pressed ? column?.setFilterValue(filterColumnOption.filterValue ?? "") :
                                            column?.setFilterValue("")
                                    }}>
                                {filterColumnOption.label}
                            </Toggle>
                        )
                    } else {
                        return (
                            <Input
                                key={filterColumnOption.name}
                                placeholder={filterColumnOption.label}
                                value={(column?.getFilterValue() as string) ?? ""}
                                onChange={(event) => column?.setFilterValue(event.target.value)}
                                className="max-w-64"
                            />
                        )
                    }

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
                        {table.getRowModel().rows?.length ? (
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
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
