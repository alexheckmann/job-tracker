"use client"

import Link from "next/link";
import {CircleUser, Menu} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import HoverableDropdownMenu from "@/components/hoverable-dropdown-menu";
import Logo from "@/components/logo";
import {usePathname} from "next/navigation";
import {CreateJobButton} from "@/components/create-job-button";
import {CreateContactButton} from "@/components/create-contact-button";

const navLinks = [
    {path: "/", label: "Applications"},
    {path: "/contacts", label: "Contacts"},
    {path: "#", label: "Analytics"}
]


export default function Navbar() {

    const pathname = usePathname();

    return (

        <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-8">
            <nav
                className="hidden bg-background flex-col gap-8 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-bold md:text-base"
                >
                    <Logo className={"h-8 w-8"}/>
                    <span>Pegasus</span>
                </Link>

                {navLinks.map(({path, label}) => (
                    <Link
                        key={path}
                        href={path}
                        className={`${
                            pathname === path
                                ? "text-foreground font-semibold"
                                : "text-muted-foreground"
                        } text-foreground transition-colors font-light hover:text-foreground`}
                    >
                        {label}
                    </Link>
                ))}

            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Logo className={"h-6 w-6"}/>
                            <span className="sr-only">Pegasus</span>
                        </Link>

                        {navLinks.map(({path, label}) => (
                            <Link
                                key={path}
                                href={path}
                                className={`${
                                    pathname === path
                                        ? "text-foreground font-semibold"
                                        : "text-muted-foreground"
                                } text-foreground transition-colors font-light hover:text-foreground`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>

            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">

                <CreateJobButton/>
                <CreateContactButton/>

                <HoverableDropdownMenu
                    dropdownMenuTrigger={
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5"/>
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    } dropdownMenuItems={[
                    <span key={1}>My Account</span>,
                    <span key={2}>Donate</span>,
                    <span key={3}>Feedback</span>,
                    <span key={4}>Logout</span>
                ]}/>
            </div>
        </header>
    )
}
