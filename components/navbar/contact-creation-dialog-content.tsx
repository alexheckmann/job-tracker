"use client"

import {DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useContactCreationDialogStore} from "@/app/data/use-get-data";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {useCreateContact} from "@/app/data/use-create-data";
import {UserRoundPlus} from "lucide-react";
import {SubmitButton} from "@/components/submit-button";

import {Contact, ContactSchema} from "@/lib/models/contact";
import ContactDialogContent from "@/components/navbar/contact-dialog-content";
import DialogContentWrapper from "@/components/dialog-content-wrapper";

export default function ContactCreationDialogContent() {

    const {setData: setIsContactCreationDialogOpen} = useContactCreationDialogStore()

    const form = useForm<Contact>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            role: "Recruiter",
            company: "",
            location: "London, United Kingdom",
            lastUpdate: new Date(),
            notes: "",
            linkedin: "",
            name: "",
            email: "",
            phone: ""
        }
    })

    const {
        mutateData: insertContact,
        isPending: isAddingContact
    } = useCreateContact(form.getValues(), setIsContactCreationDialogOpen, false)

    return (
        <DialogContentWrapper>
            <Form {...form}>
                <form onSubmit={
                    form.handleSubmit((contact: Contact) => {
                        insertContact(contact)
                    })
                }>

                    <DialogHeader>
                        <DialogTitle className={"flex flex-row gap-2 justify-center sm:justify-start"}>
                            <UserRoundPlus className={"h-4 w-4"}/>
                            Add contact
                        </DialogTitle>
                        <DialogDescription>
                            Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>

                    <ContactDialogContent form={form}/>

                    <DialogFooter>
                        <SubmitButton normalText={"Add contact"} loadingText={"Adding contact"} normalIcon={null}
                                      isPending={isAddingContact}/>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContentWrapper>
    )
}
