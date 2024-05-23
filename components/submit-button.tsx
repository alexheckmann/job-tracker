import {HTMLAttributes} from "react";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {cn} from "@/lib/utils";

interface SubmitButtonProps extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    isPending?: boolean;
    loadingText: string;
    normalText: string;
    normalIcon: any;
}

export function SubmitButton({
                                 loadingText,
                                 normalText,
                                 normalIcon,
                                 disabled = false,
                                 isPending = false,
                                 className,
                                 ...props
                             }: SubmitButtonProps) {

    return (
        <Button {...props} type="submit" className={cn("gap-2 sm:w-[140px]", className)}
                disabled={disabled || isPending}>
            <span className={cn(isPending && "animate-pulse")}>
                {isPending ? loadingText : normalText}
            </span>
            {isPending && <Loader2 className={"h-4 w-4 animate-spin"}/>}
        </Button>
    )
}
