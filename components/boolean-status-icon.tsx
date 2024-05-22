import {CheckSquare} from "lucide-react";
import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";

interface BooleanStatusIconProps extends HTMLAttributes<HTMLDivElement> {
    bool: boolean
}

/**
 * Component that displays a checkmark if the boolean is true
 * @param bool - the boolean to display
 */
export function BooleanStatusIcon({bool, className}: BooleanStatusIconProps) {

    return (
        bool && <CheckSquare className={cn("h-4 w-4 text-muted-foreground", className)}/>
    )
}
