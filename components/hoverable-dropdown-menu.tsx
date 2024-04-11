"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {ReactNode, useState} from "react";
import {cn} from "@/lib/utils";

interface HoverDropdownMenuProps {
    dropdownMenuTrigger: ReactNode,
    dropdownMenuItems: ReactNode[],
    openOnHover?: boolean,
    className?: string
}
export default function HoverableDropdownMenu({dropdownMenuTrigger, dropdownMenuItems, openOnHover = false, className}: HoverDropdownMenuProps) {
    const [openDropdown, setOpenDropdown] = useState(false);

    return (
        <DropdownMenu
            open={openDropdown}
            onOpenChange={() => {
                if (openOnHover) setOpenDropdown(false)
            }}>
            <DropdownMenuTrigger className={cn(className)}
                onMouseEnter={() => {
                    if (openOnHover) setOpenDropdown(true)
                }}
                onClick={() => setOpenDropdown(true)}
                asChild>
                {dropdownMenuTrigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onMouseLeave={() => {
                    if (openOnHover) setOpenDropdown(false)
                }}
                onClick={() => setOpenDropdown(false)}
                align="center"
            >
                {dropdownMenuItems.map((item, index) => <DropdownMenuItem asChild key={index}>{item}</DropdownMenuItem>)}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
