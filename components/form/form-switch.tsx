import {FormControl, FormItem, FormLabel} from "@/components/ui/form";
import {Switch} from "@/components/ui/switch";
import {HTMLAttributes} from "react";

interface FormSwitchProps extends HTMLAttributes<HTMLDivElement> {
    label: string,
    checked: boolean,
    onCheckedChange: (checked: boolean) => void
}

export function FormSwitch({className, label, checked, onCheckedChange}: FormSwitchProps) {
    return (
        <FormItem className={className}>
            <div className={"flex items-center space-x-2"}>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Switch checked={checked} onCheckedChange={onCheckedChange}/>
                </FormControl>
            </div>
        </FormItem>
    )
}
