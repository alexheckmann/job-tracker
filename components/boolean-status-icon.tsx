import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";
import {TrueIcon} from "@/components/icons";

interface BooleanStatusIconProps extends HTMLAttributes<HTMLDivElement> {
    bool: boolean
}

/**
 * Component that displays a checkmark if the boolean is true
 * @param bool - the boolean to display
 * @param className - tailwind classes to apply
 */
export function BooleanStatusIcon({bool, className}: BooleanStatusIconProps) {

    return (
        bool && <TrueIcon className={cn("text-muted-foreground", className)}/>
    )
}
