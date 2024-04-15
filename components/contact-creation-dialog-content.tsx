"use client"

import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useContactCreationDialogStore} from "@/app/data/job-data";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField} from "@/components/ui/form";
import {FormInput} from "@/components/form-input";
import {FormDatePicker} from "@/components/form-date-picker";
import {FormTextarea} from "@/components/form-textarea";
import {ContactEntry, insertContactSchema} from "@/lib/db/schema";
import {Button} from "@/components/ui/button";
import {useCreateContact} from "@/app/data/use-create-data";
import {useCtrlKeyShortcut} from "@/components/use-ctrl-key-shortcut";
import {NewContactIcon, LoadingIcon} from "@/components/icons";

// @ts-ignore
function SubmitButton({children, disabled = false}) {

    return (
        <Button type="submit" className={"gap-2 sm:w-[140px]"} disabled={disabled}>
            <span>{children}</span>
            {disabled ?
                <LoadingIcon/> :
                <kbd
                    className="hidden pointer-events-none lg:inline-flex h-5 select-none text-[10px] font-sans items-center rounded border px-1.5 font-light opacity-100 gap-2">
                    <span className="text-xs">Ctrl</span>
                    <span className="text-xs">M</span>
                </kbd>}
        </Button>
    )
}

export default function ContactCreationDialogContent() {

    const {setData: setIsContactCreationDialogOpen} = useContactCreationDialogStore()

    const form = useForm<ContactEntry>({
        resolver: zodResolver(insertContactSchema),
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
    } = useCreateContact(form.getValues(), setIsContactCreationDialogOpen)

    useCtrlKeyShortcut("m", () => {
        form.handleSubmit((contact: ContactEntry) => {
            insertContact(contact)
        })();
    })


    return (
        <DialogContent className="sm:max-w-[500px] max-h-[85svh] overflow-x-auto">
            <Form {...form}>
                <form onSubmit={
                    form.handleSubmit((contact: ContactEntry) => {
                        insertContact(contact)
                    })
                }>

                    <DialogHeader>
                        <DialogTitle className={"flex flex-row gap-2"}>
                            <NewContactIcon/>
                            Add contact
                        </DialogTitle>
                        <DialogDescription>
                            Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <FormField control={form.control} name={"name"} render={({field}) => (
                            <FormInput labelName={"Name"} placeholder={"Name"} isRequired
                                       field={field}/>
                        )}/>

                        <FormField control={form.control} name={"company"} render={({field}) => (
                            <FormInput labelName={"Company"} placeholder={"Company"} isRequired
                                       field={field}/>
                        )}/>

                        <div className={"grid grid-cols-2 gap-4 items-end"}>
                            <FormField control={form.control} name={"location"} render={({field}) => (
                                <FormInput labelName={"Location"} placeholder={"Location"} isRequired
                                           field={field}/>
                            )}/>

                            <FormField control={form.control} name={"role"} render={({field}) => (
                                <FormInput labelName={"Role"} placeholder={"Role"} isRequired
                                           field={field}/>
                            )}/>
                        </div>


                        <FormField control={form.control} name={"notes"} render={({field}) => (
                            <FormTextarea label={"Notes"} placeholder={"Add your notes"} field={field}/>
                        )}/>

                        <div className={"grid grid-cols-2 gap-4 items-end"}>
                            <FormField control={form.control} name={"lastUpdate"} render={({field}) => (
                                <FormDatePicker labelName={"Last update"} field={field}/>
                            )}/>

                            <FormField control={form.control} name={"linkedin"} render={({field}) => (
                                <FormInput labelName={"LinkedIn"} placeholder={"LinkedIn profile"}
                                           field={field}/>
                            )}/>

                        </div>

                        <div className={"grid grid-cols-2 gap-4 items-end"}>
                            <FormField control={form.control} name={"email"} render={({field}) => (
                                <FormInput labelName={"Email"} placeholder={"Email address"}
                                           field={field}/>
                            )}/>

                            <FormField control={form.control} name={"phone"} render={({field}) => (
                                <FormInput labelName={"Phone"} placeholder={"Phone number"}
                                           field={field}/>
                            )}/>
                        </div>

                    </div>
                    <DialogFooter>
                        <SubmitButton disabled={isAddingContact}>Add contact</SubmitButton>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    )
}
