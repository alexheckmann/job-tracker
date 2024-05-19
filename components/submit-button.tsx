import {HTMLAttributes} from "react";
import {Button} from "@/components/ui/button";
import Shortcut from "@/components/shortcut";
import {Loader2} from "lucide-react";
import {cn} from "@/lib/utils";

interface SubmitButtonProps extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    isPending?: boolean;
    showShortcut?: boolean;
}

export function SubmitButton({
                                 children,
                                 disabled = false,
                                 isPending = false,
                                 showShortcut = true,
                                 className,
                                 ...props
                             }: SubmitButtonProps) {

    return (
        <Button {...props} type="submit" className={cn("gap-2 sm:w-[140px]", className)}
                disabled={disabled || isPending}>
            <span className={cn(isPending && "animate-pulse")}>{children}</span>
            {isPending ?
                <Loader2 className={"h-4 w-4 animate-spin"}/> :
                showShortcut && <Shortcut keys={["Ctrl", "M"]}/>
            }
        </Button>
    )
}
