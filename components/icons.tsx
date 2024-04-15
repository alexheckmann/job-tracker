import {
    CheckSquare,
    ChevronDown,
    ChevronRight,
    ChevronsUpDown,
    CircleUser,
    ClipboardPlus,
    Loader2,
    Mail,
    Menu,
    MoreHorizontal,
    SquareArrowOutUpRight,
    SquarePen,
    Trash,
    UserRoundPlus,
    XSquare
} from "lucide-react";
import {cn} from "@/lib/utils";

const iconSize = "h-4 w-4"

interface IconProps {
    className?: string
}

export function LoadingIcon({className}: IconProps) {
    return (
        <Loader2 className={cn(iconSize, "animate-spin", className)}/>
    )
}

export function NewContactIcon({className}: IconProps) {
    return (
        <UserRoundPlus className={cn(iconSize, className)}/>
    )
}

export function NewJobIcon({className}: IconProps) {
    return (
        <ClipboardPlus className={cn(iconSize, className)}/>
    )
}

export function DropdownIcon({className}: IconProps) {
    return (
        <ChevronDown className={cn(iconSize, className)}/>
    )
}

export function EditIcon({className}: IconProps) {
    return (
        <SquarePen className={cn(iconSize, className)}/>
    )
}

export function DeleteIcon({className}: IconProps) {
    return (
        <Trash className={cn(iconSize, className)}/>
    )

}

export function MenuIcon({className}: IconProps) {
    return (
        <Menu className={cn(iconSize, className)}/>
    )
}

export function UserIcon({className}: IconProps) {
    return (
        <CircleUser className={cn(iconSize, className)}/>
    )
}

export function OpenLinkIcon({className}: IconProps) {
    return (
        <SquareArrowOutUpRight className={cn(iconSize, className)}/>
    )
}

export function MailIcon({className}: IconProps) {
    return (
        <Mail className={cn(iconSize, className)}/>
    )
}

export function MoreIcon({className}: IconProps) {
    return (
        <MoreHorizontal className={cn(iconSize, className)}/>
    )
}

export function SortIcon({className}: IconProps) {
    return (
        <ChevronsUpDown className={cn(iconSize, className)}/>
    )
}
export function CalendarIcon({className}: IconProps) {
    return (
        <CalendarIcon className={cn(iconSize, className)}/>
    )
}

export function YesIcon({className}: IconProps) {
    return (
        <CheckSquare className={cn(iconSize, className)}/>
    )
}

export function NoIcon({className}: IconProps) {
    return (
        <XSquare className={cn(iconSize, className)}/>
    )
}

export function ContinueIcon({className}: IconProps) {
    return (
        <ChevronRight className={cn(iconSize, className)}/>
    )
}
