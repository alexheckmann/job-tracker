import {FormControl, FormItem, FormLabel} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";

interface FormTextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
    label: string,
    placeholder?: string,
    field: any
}

export function FormTextarea({className, label, placeholder, field, ...props}: FormTextareaProps) {
    return (
        <FormItem>
            <div className="grid w-full gap-1.5">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Textarea {...props} placeholder={placeholder}
                              className={cn("resize-none h-[138px]", className)} {...field}/>
                </FormControl>
            </div>
        </FormItem>
    )
}
