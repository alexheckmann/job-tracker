import {CheckSquare} from "lucide-react";

/**
 * Component that displays a checkmark if the boolean is true
 * @param bool - the boolean to display
 */
export function BooleanStatusIcon({bool}: { bool: boolean }) {

    return (
        bool && <CheckSquare className={"h-4 w-4 text-primary"}/>
    )
}
