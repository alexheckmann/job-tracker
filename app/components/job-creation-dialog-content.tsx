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
import {useEffect} from "react";

export type JobEntry = z.infer<typeof insertJobSchema>
export type InsertedJobEntry = z.infer<typeof selectJobSchema>

async function onSubmit(jobEntryToInsert: JobEntry, jobEntries: InsertedJobEntry[], setJobEntries: (entries: InsertedJobEntry[]) => void, setIsJobCreationDialogOpen: (isOpen: boolean) => void) {
    try {
        const result = await axios.post<InsertedJobEntry>("/api/v1/jobs", jobEntryToInsert).then((res) => res.data)
        setJobEntries([...jobEntries, result])

        toast({
            title: "Job added",
            description: `Your job at ${result.company} has been added.`,
        })

        setIsJobCreationDialogOpen(false)
    } catch (error) {
        console.error(error)
        toast({
            title: "Adding unsuccessful",
            description: `Please try again to add the job at ${jobEntryToInsert.company}.`
        })
    }
}

// @ts-ignore
function SubmitButton({children}) {

    return (
        <Button type="submit" className={"gap-2"}>
            <span>{children}</span>
            <kbd
                className="hidden pointer-events-none lg:inline-flex h-5 select-none text-[10px] font-sans items-center rounded border px-1.5 font-light opacity-100 gap-2">
            <span className="text-xs">Ctrl</span>
            <span className="text-xs">M</span>
            </kbd>
        </Button>
    )
}

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
            status: "Applied",
            exactTitle: "",
            salary: "",
            isFavorite: false,
            isRecruiter: false,
            notes: ""
        }
    })


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "m" && event.ctrlKey) {
                form.handleSubmit((data: JobEntry) => onSubmit(data, jobData, setJobData, setIsJobCreationDialogOpen))();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [form, jobData, setJobData, setIsJobCreationDialogOpen]);


    return (
        <DialogContent className="sm:max-w-[500px] max-h-[85svh] overflow-auto">
            <Form {...form}>
                <form onSubmit={
                    form.handleSubmit((data: JobEntry) => onSubmit(data, jobData, setJobData, setIsJobCreationDialogOpen))
                }>

                    <DialogHeader>
                        <DialogTitle>Add Job</DialogTitle>
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
                            <FormInput labelName={"Company"} placeholder={"Company"} isRequired
                                       field={field}/>
                        )}/>

                        <div className={"grid grid-cols-2 gap-4 items-end"}>
                            <FormField control={form.control} name={"location"} render={({field}) => (
                                <FormSelect entries={cityData} label={"Location"} defaultValue={form.getValues("location")}
                                            onValueChange={field.onChange} isExpandable/>
                            )}/>

                            <FormField control={form.control} name={"country"} render={({field}) => (
                                <FormSelect entries={countryData} label={"Country"} defaultValue={form.getValues("country")}
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
                                <FormSelect entries={ApplicationStatus.options} label={"Status"} defaultValue={form.getValues("status")}
                                            onValueChange={field.onChange}/>
                            )}/>
                        </div>

                        <div className={"grid grid-cols-2 gap-4 items-end"}>
                            <FormField control={form.control} name={"exactTitle"} render={({field}) => (
                                <FormInput labelName={"Exact Title"} placeholder={"Exact title of position"}
                                           field={field}/>
                            )}/>

                            <FormField control={form.control} name={"salary"} render={({field}) => (
                                <FormInput labelName={"Salary"} placeholder={"Expected or discussed salary"}
                                           field={field}/>
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
                        <SubmitButton>Add job</SubmitButton>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    )
}
