import {
    Calendar,
    CalendarPlus,
    ChevronsUpDown,
    ClipboardPlus,
    Copy,
    Info,
    Loader2,
    MoreHorizontal,
    SquarePen,
    Trash,
    UserRoundPlus,
    X
} from "lucide-react";
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

export function SortIcon({className}: IconProps) {
    return (
        <ChevronsUpDown className={cn(defaultIconSize, className)}/>
    )
}

export function OptionsIcon({className}: IconProps) {
    return (
        <MoreHorizontal className={cn(defaultIconSize, className)}/>
    )
}

export function EditIcon({className}: IconProps) {
    return (
        <SquarePen className={cn(defaultIconSize, className)}/>
    )
}

export function DeleteIcon({className}: IconProps) {
    return (
        <Trash className={cn(defaultIconSize, className)}/>
    )
}

export function RemoveIcon({className}: IconProps) {
    return (
        <X className={cn(defaultIconSize, className)}/>
    )
}

export function CalendarIcon({className}: IconProps) {
    return (
        <Calendar className={cn(defaultIconSize, className)}/>
    )
}

export function InfoIcon({className}: IconProps) {
    return (
        <Info className={cn(defaultIconSize, className)}/>
    )
}
