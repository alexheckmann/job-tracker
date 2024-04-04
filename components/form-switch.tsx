import {FormControl, FormItem, FormLabel} from "@/components/ui/form";
import {Switch} from "@/components/ui/switch";

interface FormSwitchProps {
    label: string,
    checked: boolean,
    onCheckedChange: (checked: boolean) => void
}

export function FormSwitch({label, checked, onCheckedChange}: FormSwitchProps) {
    return (
        <FormItem>
            <div className="flex items-center space-x-2">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Switch checked={checked} onCheckedChange={onCheckedChange}/>
                </FormControl>
            </div>
        </FormItem>
    )
}
