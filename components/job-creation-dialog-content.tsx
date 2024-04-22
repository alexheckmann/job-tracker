"use client"

import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {cityData, roleData, useJobCreationDialogStore} from "@/app/data/job-data";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField} from "@/components/ui/form";
import {FormSelect} from "@/components/form-select";
import {FormInput} from "@/components/form-input";
import {FormDatePicker} from "@/components/form-date-picker";
import {FormSwitch} from "@/components/form-switch";
import {FormTextarea} from "@/components/form-textarea";
import {ApplicationStatus} from "@/lib/models/job";
import {useCreateJob} from "@/app/data/use-create-data";
import {ClipboardPlus} from "lucide-react";
import {useCtrlKeyShortcut} from "@/components/use-ctrl-key-shortcut";
import {SubmitButton} from "@/components/submit-button";

import {Job, JobSchema} from "@/lib/models/job";

export default function JobCreationDialogContent() {

    const {setData: setIsJobCreationDialogOpen} = useJobCreationDialogStore()

    const form = useForm<Job>({
        resolver: zodResolver(JobSchema),
        defaultValues: {
            role: "AI Engineer",
            company: "",
            location: "London, United Kingdom",
            lastUpdate: new Date(),
            status: "Applied",
            exactTitle: "",
            salary: "",
            isFavorite: false,
            isRecruiter: false,
            isReferral: false,
            notes: "",
            link: ""
        }
    })

    const {mutateData: insertJob, isPending: isAddingJob} = useCreateJob(form.getValues(), setIsJobCreationDialogOpen)

    useCtrlKeyShortcut("m", () => {
        form.handleSubmit((job: Job) => {
            insertJob(job)
        })();
    })


    return (
        <DialogContent className="sm:max-w-[500px] max-h-[85svh] overflow-x-auto">
            <Form {...form}>
                <form onSubmit={
                    form.handleSubmit((job: Job) => {
                        insertJob(job)
                    })
                }>

                    <DialogHeader>
                        <DialogTitle className={"flex flex-row gap-2"}>
                            <ClipboardPlus className={"h-4 w-4"}/>
                            Add job
                        </DialogTitle>
                        <DialogDescription>
                            Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <FormField control={form.control} name={"role"} render={({field}) => (
                            <FormSelect entries={roleData} label={"Role"} defaultValue={form.getValues("role")}
                                        onValueChange={field.onChange} isExpandable/>
                        )}/>

                        <FormField control={form.control} name={"company"} render={({field}) => (
                            /* TODO implement clientside validation*/
                            <FormInput labelName={"Company"} placeholder={"Company"} required
                                       field={field}/>
                        )}/>

                        <div className={"grid grid-cols-2 gap-4 items-end"}>
                            <FormField control={form.control} name={"location"} render={({field}) => (
                                <FormSelect entries={cityData} label={"Location"}
                                            defaultValue={form.getValues("location")}
                                            onValueChange={field.onChange} isExpandable/>
                            )}/>

                            <FormField control={form.control} name={"salary"} render={({field}) => (
                                <FormInput labelName={"Salary"} placeholder={"Expected or discussed salary"}
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

                            <FormField control={form.control} name={"status"} render={({field}) => (
                                <FormSelect entries={ApplicationStatus.options} label={"Status"}
                                            defaultValue={form.getValues("status")}
                                            onValueChange={field.onChange}/>
                            )}/>
                        </div>

                        <div className={"grid grid-cols-2 gap-4 items-end"}>
                            <FormField control={form.control} name={"exactTitle"} render={({field}) => (
                                <FormInput labelName={"Exact Title"} placeholder={"Exact title of position"}
                                           field={field}/>
                            )}/>

                            <FormField control={form.control} name={"link"} render={({field}) => (
                                <FormInput labelName={"Link"} placeholder={"Link to the job posting"}
                                           field={field}/>
                            )}/>
                        </div>

                        <div className={"grid grid-cols-2 gap-4 items-end"}>
                            <FormField control={form.control} name={"status"} render={({field}) => (
                                <FormSelect entries={ApplicationStatus.options} label={"Contact"}
                                            defaultValue={form.getValues("status")}
                                            onValueChange={field.onChange}/>
                            )}/>

                            <FormField control={form.control} name={"isReferral"} render={({field}) => (
                                <FormSwitch label={"Got referral"} checked={field.value}
                                            onCheckedChange={field.onChange}/>
                            )}/>
                        </div>


                        <div className={"grid grid-cols-2 gap-4 items-end"}>
                            <FormField control={form.control} name={"isFavorite"} render={({field}) => (
                                <FormSwitch label={"Favorite role"} checked={field.value}
                                            onCheckedChange={field.onChange}/>
                            )}/>

                            <FormField control={form.control} name={"isRecruiter"} render={({field}) => (
                                <FormSwitch label={"Recruitment agency"} checked={field.value}
                                            onCheckedChange={field.onChange}/>
                            )}/>
                        </div>

                    </div>
                    <DialogFooter>
                        <SubmitButton disabled={isAddingJob}>Add job</SubmitButton>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    )
}
