"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {ReactNode, useState} from "react";

interface HoverDropdownMenuProps {
    dropdownMenuTrigger: ReactNode,
    dropdownMenuItems: ReactNode[],
    openOnHover?: boolean
}
export default function HoverableDropdownMenu({dropdownMenuTrigger, dropdownMenuItems, openOnHover = false}: HoverDropdownMenuProps) {
    const [openDropdown, setOpenDropdown] = useState(false);

    return (
        <DropdownMenu
            open={openDropdown}
            onOpenChange={() => {
                if (openOnHover) setOpenDropdown(false)
            }}>
            <DropdownMenuTrigger
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
                align="center"
            >
                {dropdownMenuItems.map((item, index) => <DropdownMenuItem asChild key={index}>{item}</DropdownMenuItem>)}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
