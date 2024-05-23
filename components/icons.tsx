import {CalendarPlus, ClipboardPlus, UserRoundPlus} from "lucide-react";
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

export function JobIcon({className}: IconProps) {
    return (
        <ClipboardPlus className={cn(defaultIconSize, className)}/>
    )
}

export function ContactIcon({className}: IconProps) {
    return (
        <UserRoundPlus className={cn(defaultIconSize, className)}/>
    )
}
