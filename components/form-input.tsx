import {FormControl, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {HTMLAttributes} from "react";

interface FormInputProps extends HTMLAttributes<HTMLInputElement> {
    labelName: string,
    required?: boolean,
    field: any,
    placeholder?: string,
    maxLength?: number,
    minLength?: number
}


export function FormInput({
                              className,
                              labelName,
                              required = false,
                              field,
                              placeholder,
                              minLength,
                              maxLength,
                              ...props
                          }: FormInputProps) {

    return (
        <FormItem>
            <div className="flex flex-col gap-2">
                <div className={"flex flex-row items-end justify-between"}>
                    <FormLabel>{labelName}</FormLabel>
                    {required ?
                        <span className={"select-none text-sm font-light"}>Required</span> : null}
                </div>
                <FormControl>
                    <Input {...props} placeholder={placeholder} {...field}/>
                </FormControl>
            </div>
        </FormItem>
    )
}
