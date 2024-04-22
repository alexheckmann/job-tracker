import {HTMLAttributes, ReactNode} from "react";
import {Button} from "@/components/ui/button";
import Shortcut from "@/components/shortcut";
import {Loader2} from "lucide-react";

interface SubmitButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    disabled?: boolean;
}

export function SubmitButton({children, disabled = false, ...props}: SubmitButtonProps) {

    return (
        <Button {...props} type="submit" className={"gap-2 sm:w-[140px]"} disabled={disabled}>
            <span>{children}</span>
            {disabled ?
                <Loader2 className={"h-4 w-4 animate-spin"}/> :
                <Shortcut keys={["Ctrl", "M"]}/>
            }
        </Button>
    )
}
