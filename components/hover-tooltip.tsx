import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {HTMLAttributes} from "react";

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
    hoverText: string,
    asChild?: boolean
}

export function HoverTooltip({children, hoverText, asChild}: TooltipProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild={asChild}>
                {children}
            </TooltipTrigger>
            <TooltipContent className={"max-w-52"}>
                <p>{hoverText}</p>
            </TooltipContent>
        </Tooltip>
    );
}
