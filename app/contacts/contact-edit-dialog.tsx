"use client"

import {DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useContactEditDialogStore} from "@/app/data/use-get-data";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {SubmitButton} from "@/components/submit-button";
import {Contact, ContactSchema} from "@/lib/models/contact";
import ContactDialogContent from "@/app/contacts/contact-dialog-content";
import {useEffect} from "react";
import {useUpdateContact} from "@/app/data/use-update-data";
import DialogContentWrapper from "@/components/dialog-content-wrapper";
import {ContactIcon} from "@/components/icons";

interface ContentEditDialogProps {
    contact: Contact;
}

export default function ContactEditDialog({contact}: ContentEditDialogProps) {

    const {setData: setIsContactCreationDialogOpen} = useContactEditDialogStore()

    const form = useForm<Contact>({
        resolver: zodResolver(ContactSchema),
        defaultValues: contact
    })

    // reset form when the contact changes to update the form values
    useEffect(() => {
        form.reset(contact)
    }, [contact._id]);

    const {
        mutateData: updateContact,
        isPending: isUpdatingContact
    } = useUpdateContact(form.getValues(), setIsContactCreationDialogOpen, false)

    return (
        <DialogContentWrapper>
            <Form {...form}>
                <form onSubmit={
                    form.handleSubmit((contact: Contact) => {
                        updateContact(contact)
                    })
                }>

                    <DialogHeader>
                        <DialogTitle className={"flex flex-row gap-2 items-center justify-center sm:justify-start"}>
                            <ContactIcon/>
                            Edit contact
                        </DialogTitle>
                        <DialogDescription>
                            Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>

                    <ContactDialogContent form={form}/>

                    <DialogFooter>
                        <SubmitButton normalText={"Update"} loadingText={"Updating"} normalIcon={<ContactIcon/>}
                                      isPending={isUpdatingContact}/>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContentWrapper>
    )
}
