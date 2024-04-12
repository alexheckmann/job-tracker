import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {formatDate} from "@/lib/formatDate";
import {format} from "date-fns";

export function LastUpdatedTooltip({date}: { date: Date }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <span>{formatDate(date)}</span>
            </TooltipTrigger>
            <TooltipContent>
                <p>Last updated on {format(date, "dd/MM/yyyy")}.</p>
            </TooltipContent>
        </Tooltip>
    );
}
