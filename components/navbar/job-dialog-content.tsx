"use client"

import {FormField} from "@/components/ui/form";
import {FormSelect} from "@/components/form/form-select";
import {FormInput} from "@/components/form/form-input";
import {FormTextarea} from "@/components/form/form-textarea";
import {FormDatePicker} from "@/components/form/form-date-picker";
import {ApplicationStatus, Job} from "@/lib/models/job";
import {FormSwitch} from "@/components/form/form-switch";
import {Button} from "@/components/ui/button";
import {UseFormReturn} from "react-hook-form";
import {useSession} from "next-auth/react";
import {Star} from "lucide-react";

interface JobDialogContentProps {
    form: UseFormReturn<Job>;
}

export default function JobDialogContent({form}: JobDialogContentProps) {

    const {data: session} = useSession()
    const roles = session?.user?.roles || []
    const locations = session?.user?.locations || []

    return (
        <div className="grid gap-4 py-4">
            <div className={"grid grid-cols-5 xs:grid-cols-6 sm:grid-cols-7 md:grid-cols-8 gap-4 items-end"}>
                <FormField control={form.control} name={"role"} render={({field}) => (
                    <FormSelect className={"col-span-4 xs:col-span-5 sm:col-span-6 md:col-span-7"} entries={roles}
                                label={"Role"}
                                defaultValue={form.getValues("role")}
                                onValueChange={field.onChange}/>
                )}/>

                <FormField control={form.control} name={"isFavorite"} render={({field}) => (
                    <Button variant={"ghost"} type={"button"} className={"p-3"}
                            onClick={() => form.setValue("isFavorite", !form.getValues<"isFavorite">("isFavorite"))
                            }>
                        {field.value ?
                            <Star fill={"#FFD700"} className="h-6 w-6 text-ternary"/> :
                            <Star className={"h-6 w-6 text-muted-foreground"}/>}
                    </Button>
                )}/>
            </div>


            <FormField control={form.control} name={"company"} render={({field}) => (
                /* TODO implement clientside validation*/
                <FormInput labelName={"Company"} placeholder={"Company"} required
                           field={field}/>
            )}/>

            <div className={"grid grid-cols-2 gap-4 items-end"}>
                <FormField control={form.control} name={"location"} render={({field}) => (
                    <FormSelect entries={locations} label={"Location"}
                                defaultValue={form.getValues("location")}
                                onValueChange={field.onChange}/>
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

                <FormField control={form.control} name={"isReferral"} render={({field}) => (
                    <FormSwitch label={"Got referral"} checked={field.value}
                                onCheckedChange={field.onChange}/>
                )}/>

                <FormField control={form.control} name={"isRecruiter"} render={({field}) => (
                    <FormSwitch label={"Recruitment agency"} checked={field.value}
                                onCheckedChange={field.onChange}/>
                )}/>
            </div>

        </div>
    )
}
