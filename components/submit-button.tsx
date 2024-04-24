import {HTMLAttributes} from "react";
import {Button} from "@/components/ui/button";
import Shortcut from "@/components/shortcut";
import {Loader2} from "lucide-react";
import {cn} from "@/lib/utils";

interface SubmitButtonProps extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
}

export function SubmitButton({children, disabled = false, ...props}: SubmitButtonProps) {

    return (
        <Button {...props} type="submit" className={"gap-2 sm:w-[140px]"} disabled={disabled}>
            <span className={cn(disabled && "animate-pulse")}>{children}</span>
            {disabled ?
                <Loader2 className={"h-4 w-4 animate-spin"}/> :
                <Shortcut keys={["Ctrl", "M"]}/>
            }
        </Button>
    )
}
