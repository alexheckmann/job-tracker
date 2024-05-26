import {HoverTooltip} from "@/components/hover-tooltip";
import {InfoIcon} from "@/components/icons";

interface InfoButtonProps {
    infoText: string
}

export function InfoHover({infoText}: InfoButtonProps) {
    return (
        <HoverTooltip hoverText={infoText}>
            <InfoIcon className={"text-muted-foreground"}/>
        </HoverTooltip>
    )
}
