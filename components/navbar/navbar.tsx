"use client"

import Link from "next/link";
import {CircleUser, Menu} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import Logo from "@/components/logo";
import {usePathname} from "next/navigation";
import {JobCreationButton} from "@/components/navbar/job-creation-button";
import {ContactCreationButton} from "@/components/navbar/contact-creation-button";
import {signOut, useSession} from "next-auth/react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useState} from "react";
import {SignInButton} from "@/components/sign-in-button";

const navLinks = [
    {path: "/dashboard", label: "Applications"},
    {path: "/contacts", label: "Contacts"},
    // {path: "/notes", label: "Notes"},
    // {path: "/analytics", label: "Analytics"}
]

const profileLinks = [
    {path: "/settings", label: "Settings"},
    {path: "/feedback", label: "Feedback", publicLink: true},
    // {path: "/donate", label: "Donate", public: true}, TODO implement donate
]


export default function Navbar() {

    const pathname = usePathname();
    const {status} = useSession();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const isAuthenticated = status === "authenticated";

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

                {isAuthenticated && navLinks.map(({path, label}) => (

                    <Link
                        key={path}
                        href={path}
                        className={`${
                            pathname === path
                                ? "text-foreground font-semibold"
                                : "text-muted-foreground"
                        } text-foreground transition-colors font-light w-full h-full px-2 py-4`}
                    >
                        {label}
                    </Link>
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
                <SheetContent side="left" className={"flex flex-col h-full"}>
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-bold md:text-base px-4 py-2"
                        >
                            <Logo className={"h-8 w-8"}/>
                            <span>Pegasus</span>
                        </Link>

                        {isAuthenticated && navLinks.map(({path, label}) => (
                            <Link
                                key={path}
                                href={path}
                                onClick={() => setIsSheetOpen(false)}
                                className={`${
                                    pathname === path
                                        ? "text-foreground font-semibold"
                                        : "text-muted-foreground"
                                } text-foreground transition-colors font-light w-full h-full px-4 py-2`}
                            >
                                {label}
                            </Link>
                        ))}

                        {profileLinks.map(({path, label, publicLink}) => {
                            if (publicLink || isAuthenticated)
                                return (
                                    <Link
                                        key={path}
                                        href={path}
                                        onClick={() => setIsSheetOpen(false)}
                                        className={`${
                                            pathname === path
                                                ? "text-foreground font-semibold"
                                                : "text-muted-foreground"
                                        } text-foreground transition-colors font-light w-full h-full px-4 py-2`}>
                                        {label}
                                    </Link>
                                )
                        })}
                    </nav>

                    {isAuthenticated &&
                        <Button
                            variant="outline"
                            size="icon"
                            className="w-full px-4 py-2 mt-auto"
                            onClick={() => {
                                signOut({callbackUrl: "/"})
                                setIsSheetOpen(false)
                            }}
                        >
                            Sign out
                        </Button>
                    }
                </SheetContent>
            </Sheet>

            <div className="flex w-full items-center gap-2 md:ml-auto lg:gap-4">

                {isAuthenticated && <JobCreationButton className={"ml-auto"}/>}
                {isAuthenticated && <ContactCreationButton/>}

                {/* TODO fix and replace with viable alternative*/}
                {isAuthenticated ?
                    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full hidden md:inline-flex">
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
                                signOut({callbackUrl: "/"})
                                setIsDropdownOpen(false)
                            }}>
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> :
                    <SignInButton className={"ml-auto"}/>
                }
            </div>
        </header>
    )
}
