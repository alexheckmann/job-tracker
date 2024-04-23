import {FormField} from "@/components/ui/form";
import {FormSelect} from "@/components/form-select";
import {cityData, roleData} from "@/app/data/use-get-data";
import {FormInput} from "@/components/form-input";
import {FormTextarea} from "@/components/form-textarea";
import {FormDatePicker} from "@/components/form-date-picker";
import {ApplicationStatus, Job} from "@/lib/models/job";
import {FormSwitch} from "@/components/form-switch";
import {Button} from "@/components/ui/button";
import {Star} from "lucide-react";
import {UseFormReturn} from "react-hook-form";

interface JobDialogContentProps {
    form: UseFormReturn<Job>;
}

export default function JobDialogContent({form}: JobDialogContentProps) {
    return (
        <div className="grid gap-4 py-4">
            <div className={"grid grid-cols-8 gap-4 items-end"}>
                <FormField control={form.control} name={"role"} render={({field}) => (
                    <FormSelect className={"col-span-7"} entries={roleData} label={"Role"}
                                defaultValue={form.getValues("role")}
                                onValueChange={field.onChange} isExpandable/>
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
