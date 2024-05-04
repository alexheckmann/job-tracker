import {HTMLAttributes} from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

/**
 * Props for the tooltip component
 */
interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
    hoverText: string,
    asChild?: boolean
}

/**
 * A tooltip that appears when hovering over an element. For elements that contain a link, use LinkHoverTooltip to avoid errors.
 * @param children the element to wrap with the tooltip
 * @param hoverText the text to display in the tooltip
 * @param asChild whether the trigger should be a child
 * @param className styling for the tooltip
 * @constructor
 */
export function HoverTooltip({children, hoverText, asChild, className}: TooltipProps) {
    return (
        <HoverCard>
            <HoverCardTrigger className={className} asChild={asChild}>
                {children}
            </HoverCardTrigger>
            <HoverCardContent className={"w-fit max-w-52 px-3 py-1.5"} side={"top"}>
                <p>{hoverText}</p>
            </HoverCardContent>
        </HoverCard>
    );
}

/**
 * A tooltip that appears when hovering over a link
 * @param children the element to wrap with the tooltip containing the link
 * @param hoverText the text to display in the tooltip
 * @param asChild whether the trigger should be a child
 * @param className styling for the tooltip
 * @constructor
 */
export function LinkHoverTooltip({children, hoverText, asChild, className}: TooltipProps) {
    return (
        <Tooltip>
            <TooltipTrigger className={className} asChild={asChild} tabIndex={-1}>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                {hoverText}
            </TooltipContent>
        </Tooltip>
    );
}
