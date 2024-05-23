import {Toggle} from "@/components/ui/toggle";
import {Input} from "@/components/ui/input";
import InputMultiSelect from "@/components/input-multi-select";
import {Column} from "@tanstack/react-table";
import {ColumnFilterOption} from "@/components/data-table";

interface DataTableColumnFilterProps {
    column: Column<any, any> | undefined,
    columnFilterOption: ColumnFilterOption
}

export function DataTableColumnFilter({column, columnFilterOption}: DataTableColumnFilterProps) {

    if (columnFilterOption.type === "button") {
        return (
            <Toggle
                variant={"outline"}
                onPressedChange={
                    (pressed) => {
                        pressed ? column?.setFilterValue(columnFilterOption.filterValue) :
                            column?.setFilterValue("")
                    }}>
                {columnFilterOption.label}
            </Toggle>
        )
    } else if (columnFilterOption.type === "input") {
        return (
            <Input
                placeholder={columnFilterOption.label}
                value={(column?.getFilterValue() as string) ?? ""}
                onChange={(event) => column?.setFilterValue(event.target.value)}
                className="max-w-44 sm:max-w-64"
            />
        )
    } else if (columnFilterOption.type === "select") {
        return (
            <InputMultiSelect label={columnFilterOption.label}
                              options={columnFilterOption.initialValues}
                              onSelectFunction={column?.setFilterValue!}
            />
        )
    }
}
