"use client"

import {useContactCreationDialogStore} from "@/app/data/job-data";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {UserRoundPlus} from "lucide-react";
import ContactCreationDialogContent from "@/components/contact-creation-dialog-content";
import {useCtrlKeyShortcut} from "@/components/use-ctrl-key-shortcut";

export function CreateContactButton() {
    const {data: isContactCreationDialogOpen, setData: setIsContactCreationDialogOpen} = useContactCreationDialogStore()

    useCtrlKeyShortcut("i", () => {
        setIsContactCreationDialogOpen(true)
    })

    return (
        <Dialog open={isContactCreationDialogOpen} onOpenChange={setIsContactCreationDialogOpen}>
            <DialogTrigger asChild>
                <Button variant={"secondary"} className={"w-fit gap-2"}>
                    <UserRoundPlus className={"h-4 w-4"}/>
                    <span>New contact</span>
                </Button>
            </DialogTrigger>
            <ContactCreationDialogContent/>
        </Dialog>
    );
}
