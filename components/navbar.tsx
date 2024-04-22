"use client"

import Link from "next/link";
import {CircleUser, Menu} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import HoverableDropdownMenu from "@/components/hoverable-dropdown-menu";
import Logo from "@/components/logo";
import {usePathname} from "next/navigation";
import {JobCreationButton} from "@/components/job-creation-button";
import {ContactCreationButton} from "@/components/contact-creation-button";
import {signOut, useSession} from "next-auth/react";
import {GoogleLoginButton} from "@/components/google-login-button";

const navLinks = [
    {path: "/", label: "Applications"},
    {path: "/contacts", label: "Contacts"},
    {path: "#", label: "Analytics"}
]


export default function Navbar() {

    const pathname = usePathname();
    const {status, data} = useSession();

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
                            key={path}>
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
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Logo className={"h-6 w-6"}/>
                            <span className="sr-only">Pegasus</span>
                        </Link>

                        {navLinks.map(({path, label}) => (
                            <Button variant={"link"} key={path} className={"hover:no-underline hover:text-foreground"}>
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

            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">

                {status === "authenticated" && <JobCreationButton/>}
                {status === "authenticated" && <ContactCreationButton/>}

                {/* TODO fix and replace with viable alternative*/}
                {status === "authenticated" ?
                    <HoverableDropdownMenu
                        dropdownMenuTrigger={
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5"/>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        } dropdownMenuItems={[
                        <span key={1}>{data?.user?.name}</span>,
                        <span key={2}>Donate</span>,
                        <span key={3}>Feedback</span>,
                        <Button key={4} onClick={() => signOut()}>Sign out</Button>
                    ]}/> :
                    <GoogleLoginButton className={"ml-auto"}/>
                }
            </div>
        </header>
    )
}
