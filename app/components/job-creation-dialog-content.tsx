"use client"

import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {z} from "zod"
import {cityData, countryData, roleData, useJobCreationDialogStore, useJobEntriesStore} from "@/app/data/job-data";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField} from "@/components/ui/form";
import {FormSelect} from "@/components/form-select";
import {FormInput} from "@/components/form-input";
import {FormDatePicker} from "@/components/form-date-picker";
import {FormSwitch} from "@/components/form-switch";
import {FormTextarea} from "@/components/form-textarea";
import {ApplicationStatus, insertJobSchema, selectJobSchema} from "@/lib/db/schema";
import axios from "axios";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";

export type JobEntry = z.infer<typeof insertJobSchema>
export type InsertedJobEntry = z.infer<typeof selectJobSchema>

export default function JobCreationDialogContent() {

    const {data: jobData, setData: setJobData} = useJobEntriesStore()
    const {setData: setIsJobCreationDialogOpen} = useJobCreationDialogStore()

    const form = useForm<JobEntry>({
        resolver: zodResolver(insertJobSchema),
        defaultValues: {
            role: "AI Engineer",
            company: "",
            location: "London",
            country: "United Kingdom",
            lastUpdate: new Date(),
            status: "Saved",
            exactTitle: "",
            salary: "",
            isFavorite: false,
            isRecruiter: false,
            notes: ""
        }
    })

    async function onSubmit(data: JobEntry) {
        try {
            const result = await axios.post<InsertedJobEntry>("/api/v1/jobs", data).then((res) => res.data)
            setJobData([...jobData, result])

            toast({
                title: "Saved!",
                description: "Your job has been added.",
            })

            setIsJobCreationDialogOpen(false)
        } catch (error) {
            console.error(error)
            toast({
                title: "Adding unsuccessful",
                description: "Please try again."
            })
        }
    }


    return (
        <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
                <form onSubmit={
                    form.handleSubmit((data: JobEntry) => onSubmit(data))
                }>

                    <DialogHeader>
                        <DialogTitle>Add Job</DialogTitle>
                        <DialogDescription>
                            Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <FormField control={form.control} name={"role"} render={({field}) => (
                            <FormSelect entries={roleData} label={"Role"} defaultValue={"AI Engineer"}
                                        onValueChange={field.onChange} isExpandable/>
                        )}/>

                        <FormField control={form.control} name={"company"} render={({field}) => (
                            <FormInput labelName={"Company"} placeholder={"Company"} isRequired
                                       field={field}/>
                        )}/>

                        <div className={"grid grid-cols-2 gap-4 items-end"}>
                            <FormField control={form.control} name={"location"} render={({field}) => (
                                <FormSelect entries={cityData} label={"Location"} defaultValue={"London"}
                                            onValueChange={field.onChange} isExpandable/>
                            )}/>

                            <FormField control={form.control} name={"country"} render={({field}) => (
                                <FormSelect entries={countryData} label={"Country"} defaultValue={"United Kingdom"}
                                            onValueChange={field.onChange} isExpandable/>
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
                                <FormSelect entries={ApplicationStatus.options} label={"Status"} defaultValue={"Saved"}
                                            onValueChange={field.onChange}/>
                            )}/>
                        </div>

                        <div className={"grid grid-cols-2 gap-4 items-end"}>
                            <FormField control={form.control} name={"exactTitle"} render={({field}) => (
                                <FormInput labelName={"Exact Title"} placeholder={"Exact Job Title"}
                                           field={field}/>
                            )}/>

                            <FormField control={form.control} name={"salary"} render={({field}) => (
                                <FormInput labelName={"Salary"} placeholder={"Salary"}
                                           field={field}/>
                            )}/>
                        </div>

                        <div className={"grid grid-cols-2 gap-4 items-end"}>
                            <FormField control={form.control} name={"isFavorite"} render={({field}) => (
                                <FormSwitch label={"Potential favorite"} checked={field.value}
                                            onCheckedChange={field.onChange}/>
                            )}/>

                            <FormField control={form.control} name={"isRecruiter"} render={({field}) => (
                                <FormSwitch label={"Recruiter call"} checked={field.value}
                                            onCheckedChange={field.onChange}/>
                            )}/>
                        </div>


                    </div>
                    <DialogFooter>
                        <Button type="submit">Add to Job Tracker</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    )
}
