import {FormControl, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

interface FormInputProps {
    labelName: string,
    isRequired?: boolean,
    placeholder?: string,
    field: any,
    maxLength?: number,
    minLength?: number
}

export function FormInput({labelName, isRequired = false, placeholder, field, minLength, maxLength}: FormInputProps) {

    return (
        <FormItem>
            <div className="flex flex-col gap-2">
                <div className={"flex flex-row items-end justify-between"}>
                    <FormLabel>{labelName}</FormLabel>
                    {isRequired ?
                        <span className={"select-none text-sm font-light"}>Required</span> : null}
                </div>
                <FormControl>
                    <Input placeholder={placeholder} {...field} maxLength={maxLength} minLength={minLength}/>
                </FormControl>
            </div>
        </FormItem>
    )
}
