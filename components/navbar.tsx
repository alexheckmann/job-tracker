"use client"

import Link from "next/link";
import {CircleUser, Menu} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import Logo from "@/components/logo";
import {usePathname} from "next/navigation";
import {JobCreationButton} from "@/components/job-creation-button";
import {ContactCreationButton} from "@/components/contact-creation-button";
import {signOut, useSession} from "next-auth/react";
import {GoogleLoginButton} from "@/components/google-login-button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useState} from "react";

const navLinks = [
    {path: "/", label: "Applications"},
    {path: "/contacts", label: "Contacts"},
    // {path: "/notes", label: "Notes"},
    // {path: "/analytics", label: "Analytics"}
]

const profileLinks = [
    {path: "/settings", label: "Settings"},
    // {path: "/feedback", label: "Feedback"}, TODO implement feedback
    // {path: "/donate", label: "Donate"}, TODO implement donate
]


export default function Navbar() {

    const pathname = usePathname();
    const {status, data} = useSession();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (

        <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-8">
            <nav
                className="hidden bg-background flex-col gap-3 text-lg font-medium md:flex md:flex-row md:items-center md:gap-2 md:text-sm lg:gap-2">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-bold md:text-base"
                >
                    <Logo className={"h-8 w-8"}/>
                    <span>Pegasus</span>
                </Link>

                {navLinks.map(({path, label}) => (

                    <Button variant={"link"} className={"hover:no-underline hover:text-muted-foreground px-2"}
                            key={path} tabIndex={-1}>
                        <Link
                            href={path}
                            className={`${
                                pathname === path
                                    ? "text-foreground font-semibold"
                                    : "text-muted-foreground"
                            } text-foreground transition-colors font-light`}
                        >
                            {label}
                        </Link>
                    </Button>
                ))}

            </nav>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Logo className={"h-6 w-6"}/>
                            <span className="sr-only">Pegasus</span>
                        </Link>

                        {navLinks.map(({path, label}) => (
                            <Button variant={"link"} key={path} className={"hover:no-underline hover:text-foreground"}
                                    onClick={() => setIsSheetOpen(false)} tabIndex={-1}>
                                <Link
                                    href={path}
                                    className={`${
                                        pathname === path
                                            ? "text-foreground font-semibold"
                                            : "text-muted-foreground"
                                    } text-foreground transition-colors font-light`}
                                >
                                    {label}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>

            <div className="flex w-full items-center gap-2 md:ml-auto lg:gap-4">

                {status === "authenticated" && <JobCreationButton className={"ml-auto"}/>}
                {status === "authenticated" && <ContactCreationButton/>}

                {/* TODO fix and replace with viable alternative*/}
                {status === "authenticated" ?
                    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5"/>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            {profileLinks.map(({path, label}) => (
                                <DropdownMenuItem key={path} className={"cursor-pointer"}>
                                    <Link
                                        href={path}
                                        className={`${
                                            pathname === path
                                                ? "text-foreground font-semibold"
                                                : "text-popover-foreground font-normal"
                                        } text-foreground transition-colors font-light w-full h-full`}
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuItem className={"cursor-pointer"} onClick={() => {
                                signOut()
                                setIsDropdownOpen(false)
                            }}>
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    :
                    <GoogleLoginButton disabled={status === "loading"} className={"ml-auto"}/>
                }
            </div>
        </header>
    )
}
