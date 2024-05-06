"use client"

import {useContactCreationDialogStore} from "@/app/data/use-get-data";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {UserRoundPlus} from "lucide-react";
import ContactCreationDialogContent from "@/components/navbar/contact-creation-dialog-content";
import {useCtrlKeyShortcut} from "@/components/use-ctrl-key-shortcut";
import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";

interface ContactCreationButtonProps extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean
}

export function ContactCreationButton({disabled, className, ...props}: ContactCreationButtonProps) {
    const {data: isContactCreationDialogOpen, setData: setIsContactCreationDialogOpen} = useContactCreationDialogStore()

    useCtrlKeyShortcut("i", () => {
        setIsContactCreationDialogOpen(true)
    })

    return (
        <Dialog open={isContactCreationDialogOpen} onOpenChange={setIsContactCreationDialogOpen}>
            <DialogTrigger asChild>
                <Button {...props} variant={"secondary"} className={cn("w-fit gap-2", className)}>
                    <UserRoundPlus className={"h-4 w-4"}/>
                    <span>New contact</span>
                </Button>
            </DialogTrigger>
            <ContactCreationDialogContent/>
        </Dialog>
    );
}
