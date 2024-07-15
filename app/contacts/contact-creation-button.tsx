"use client"

import {useContactCreationDialogStore} from "@/app/data/use-get-data";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import ContactCreationDialog from "@/app/contacts/contact-creation-dialog";
import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";
import {ContactIcon} from "@/components/icons";

interface ContactCreationButtonProps extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean
}

export function ContactCreationButton({disabled, className, ...props}: ContactCreationButtonProps) {
    const {data: isContactCreationDialogOpen, setData: setIsContactCreationDialogOpen} = useContactCreationDialogStore()

    return (
        <Dialog open={isContactCreationDialogOpen} onOpenChange={setIsContactCreationDialogOpen}>
            <DialogTrigger asChild>
                <Button {...props} variant={"secondary"} className={cn("w-fit gap-2", className)}>
                    <ContactIcon className={"hidden xs:inline-flex"}/>
                    <span>Contact</span>
                </Button>
            </DialogTrigger>
            <ContactCreationDialog/>
        </Dialog>
    );
}
