import {
    Calendar,
    CalendarPlus,
    CheckSquare,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsUpDown,
    ChevronUp,
    ClipboardPlus,
    Copy,
    Earth,
    HandHeart,
    Info,
    Linkedin,
    Loader2,
    LucideIcon,
    Mail,
    MessagesSquare,
    MoreHorizontal,
    SquareArrowOutUpRight,
    SquarePen,
    Trash,
    UserRoundPlus,
    X,
    XSquare
} from "lucide-react";
import {cn} from "@/lib/utils";
import {HTMLAttributes} from "react";

interface IconProps extends HTMLAttributes<LucideIcon> {
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

export function MailIcon({className}: IconProps) {
    return (
        <Mail className={cn(defaultIconSize, className)}/>
    )
}

export function LinkedinIcon({className}: IconProps) {
    return (
        <Linkedin className={cn(defaultIconSize, className)}/>
    )
}

export function ExternalLinkIcon({className}: IconProps) {
    return (
        <SquareArrowOutUpRight className={cn(defaultIconSize, className)}/>
    )
}

export function UpIcon({className}: IconProps) {
    return (
        <ChevronUp className={cn(defaultIconSize, className)}/>
    )
}

export function DownIcon({className}: IconProps) {
    return (
        <ChevronDown className={cn(defaultIconSize, className)}/>
    )
}

export function LeftIcon({className}: IconProps) {
    return (
        <ChevronLeft className={cn(defaultIconSize, className)}/>
    )

}

export function RightIcon({className}: IconProps) {
    return (
        <ChevronRight className={cn(defaultIconSize, className)}/>
    )
}

export function TrueIcon({className}: IconProps) {
    return (
        <CheckSquare className={cn(defaultIconSize, className)}/>
    )
}

export function FalseIcon({className}: IconProps) {
    return (
        <XSquare className={cn(defaultIconSize, className)}/>
    )
}

export function FeedbackIcon({className}: IconProps) {
    return (
        <MessagesSquare className={cn(defaultIconSize, className)}/>
    )
}

export function DonateIcon({className}: IconProps) {
    return (
        <HandHeart className={cn(defaultIconSize, className)}/>
    )
}

export function GlobalIcon({className}: IconProps) {
    return (
        <Earth className={cn(defaultIconSize, className)}/>
    )
}
