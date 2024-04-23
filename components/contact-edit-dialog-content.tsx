"use client"

import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useContactEditDialogStore} from "@/app/data/use-get-data";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {UserRoundPlus} from "lucide-react";
import {SubmitButton} from "@/components/submit-button";
import {Contact, ContactSchema} from "@/lib/models/contact";
import ContactDialogContent from "@/components/contact-dialog-content";
import {useMemo} from "react";
import {useUpdateContact} from "@/app/data/use-update-data";

interface ContentEditDialogContentProps {
    contact: Contact;
}

export default function ContactEditDialogContent({contact}: ContentEditDialogContentProps) {

    const {setData: setIsContactCreationDialogOpen} = useContactEditDialogStore()

    const form = useForm<Contact>({
        resolver: zodResolver(ContactSchema),
        defaultValues: useMemo(() => contact, [contact])
    })

    const {
        mutateData: insertContact,
        isPending: isAddingContact
    } = useUpdateContact(form.getValues(), setIsContactCreationDialogOpen, false)

    return (
        <DialogContent className="sm:max-w-[500px] max-h-[85svh] overflow-x-auto">
            <Form {...form}>
                <form onSubmit={
                    form.handleSubmit((contact: Contact) => {
                        insertContact(contact)
                    })
                }>

                    <DialogHeader>
                        <DialogTitle className={"flex flex-row gap-2"}>
                            <UserRoundPlus className={"h-4 w-4"}/>
                            Edit contact
                        </DialogTitle>
                        <DialogDescription>
                            Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>

                    <ContactDialogContent form={form}/>

                    <DialogFooter>
                        <SubmitButton
                            disabled={isAddingContact}>{isAddingContact ? "Saving contact" : "Save contact"}</SubmitButton>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    )
}
