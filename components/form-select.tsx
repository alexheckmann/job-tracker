import {FormControl, FormItem, FormLabel} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";

interface FormSelectProps extends HTMLAttributes<HTMLDivElement> {
    entries: string[],
    defaultValue: string,
    label: string,
    onValueChange?: (value: string) => void,
    isExpandable?: boolean
}

export function FormSelect({
                               className,
                               entries,
                               label,
                               defaultValue,
                               onValueChange,
                               isExpandable = false
                           }: FormSelectProps) {

    return (
        <div className={cn(className, "flex flex-col gap-2")}>
            <FormItem>

                <FormLabel>{label}</FormLabel>
                <Select defaultValue={defaultValue} onValueChange={onValueChange}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue/>
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent align={"center"}>
                        <SelectGroup>
                            {entries.map((item, index) => <SelectItem key={index}
                                                                      value={item}>{item}</SelectItem>)}

                            {isExpandable && <div>
                                <SelectSeparator/>
                                <SelectItem value={"add"}>Add Item</SelectItem>
                            </div>}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </FormItem>
        </div>
    )
}
