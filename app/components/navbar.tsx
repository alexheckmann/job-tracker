"use client"

import Link from "next/link";
import {BriefcaseBusiness, CircleUser, Menu, Plus, Sailboat, Search} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import HoverableDropdownMenu from "@/app/components/hoverable-dropdown-menu";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import JobCreationDialogContent from "@/app/components/job-creation-dialog-content";
import Logo from "@/components/logo";

export default function Navbar() {

    const {data: isJobCreationDialogOpen, setData: setIsJobCreationDialogOpen} = useJobCreationDialogStore()

    return (

        <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-8">
            <nav
                className="hidden bg-background flex-col gap-8 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-bold md:text-base"
                >
                    <Logo className={"h-8 w-8"}/>
                    <span>Pegasus</span>
                </Link>
                <Link
                    href="#"
                    className="text-foreground transition-colors font-light hover:text-foreground"
                >
                    Applications
                </Link>
                <Link
                    href="#"
                    className="text-muted-foreground transition-colors font-light hover:text-foreground"
                >
                    Contacts
                </Link>
                <Link
                    href="#"
                    className="text-muted-foreground transition-colors font-light hover:text-foreground"
                >
                    Analytics
                </Link>
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
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Applications
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Contacts
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Analytics
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            type="search"
                            placeholder="Search company..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
                <Dialog open={isJobCreationDialogOpen} onOpenChange={setIsJobCreationDialogOpen}>
                    <HoverableDropdownMenu openOnHover={true}
                                           dropdownMenuTrigger={
                                               <Button className={"gap-1"} variant={"secondary"}>
                                                   <Plus className="h-4 w-4 rotate-0 scale-100 transition-all"/>
                                                   <span>Add</span>
                                               </Button>}
                                           dropdownMenuItems=
                                               {[
                                                   <DialogTrigger key={1} className={"w-full gap-2"}>
                                                       <BriefcaseBusiness className={"h-4 w-4"}/>
                                                       <span>Job</span>
                                                   </DialogTrigger>
                                               ]}
                    />
                    <JobCreationDialogContent/>
                </Dialog>
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
