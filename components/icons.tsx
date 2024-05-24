import {CalendarPlus, ClipboardPlus, Copy, Loader2, UserRoundPlus} from "lucide-react";
import {cn} from "@/lib/utils";
import {HTMLAttributes} from "react";

interface IconProps extends HTMLAttributes<HTMLDivElement> {

}

const defaultIconSize = "h-4 w-4"

export function LoadingIcon({className}: IconProps) {
    return (
        <Loader2 className={cn(defaultIconSize, "animate-spin", className)}/>
    )
}

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

export function CopyIcon({className}: IconProps) {
    return (
        <Copy className={cn(defaultIconSize, className)}/>
    )
}
