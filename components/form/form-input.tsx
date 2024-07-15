import {FormControl, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {HTMLAttributes, HTMLInputTypeAttribute, ReactElement} from "react";
import {ConditionalWrapper} from "@/components/conditional-wrapper";

interface FormInputProps extends HTMLAttributes<HTMLInputElement> {
    labelName?: string,
    required?: boolean,
    field: any,
    placeholder?: string,
    maxLength?: number,
    minLength?: number,
    type?: HTMLInputTypeAttribute
}


export function FormInput({
                              className,
                              labelName,
                              required = false,
                              field,
                              placeholder,
                              minLength,
                              maxLength,
                              type,
                              ...props
                          }: FormInputProps) {

    return (
        <FormItem>
            <ConditionalWrapper condition={!!labelName} wrapper={(children: ReactElement) => (
                <div className="flex flex-col gap-2">
                    <div className={"flex flex-row items-end justify-between"}>
                        {labelName &&
                            <FormLabel>
                                {labelName}
                            </FormLabel>}
                        {required &&
                            <span className={"select-none text-sm font-light"}>
                            Required
                        </span>}
                    </div>
                    {children}
                </div>
            )}>
                <FormControl>
                    <Input {...props} type={type} placeholder={placeholder} {...field}/>
                </FormControl>
            </ConditionalWrapper>
        </FormItem>
    )
}
