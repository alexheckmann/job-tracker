import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

interface TooltipProps {
    displayText: string,
    hoverText: string
}

export function HoverTooltip({displayText, hoverText}: TooltipProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <span>{displayText}</span>
            </TooltipTrigger>
            <TooltipContent>
                <p>{hoverText}</p>
            </TooltipContent>
        </Tooltip>
    );
}
