import {CalendarPlus} from "lucide-react";
import {cn} from "@/lib/utils";
import {HTMLAttributes} from "react";

interface IconProps extends HTMLAttributes<HTMLDivElement> {

}

const defaultIconSize = "h-4 w-4"

export function InterviewIcon({className}: IconProps) {
    return (
        <CalendarPlus className={cn(defaultIconSize, className)}/>
    )
}
