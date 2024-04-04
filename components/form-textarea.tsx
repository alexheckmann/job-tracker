import {FormControl, FormItem, FormLabel} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";

interface FormTextareaProps {
    label: string,
    placeholder: string,
    field: any
}

export function FormTextarea({label, placeholder, field}: FormTextareaProps) {
    return (
        <FormItem>
            <div className="grid w-full gap-1.5">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Textarea placeholder={placeholder}
                              className={"resize-none"} {...field}/>
                </FormControl>
            </div>
        </FormItem>
    )
}
