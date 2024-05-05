import {HoverTooltip} from "@/components/hover-tooltip";
import {Info} from "lucide-react";

interface InfoButtonProps {
    infoText: string
}

export function InfoButton({infoText}: InfoButtonProps) {
    return (
        <HoverTooltip hoverText={infoText}>
            <Info className={"h-4 w-4 text-muted-foreground"}/>
        </HoverTooltip>
    )
}
