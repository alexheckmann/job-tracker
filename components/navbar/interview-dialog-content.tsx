import {FormField} from "@/components/ui/form";
import {FormInput} from "@/components/form/form-input";
import {FormTextarea} from "@/components/form/form-textarea";
import {FormDatePicker} from "@/components/form/form-date-picker";
import {UseFormReturn} from "react-hook-form";
import {Interview, InterviewType} from "@/lib/models/interview";
import {FormSelect} from "@/components/form/form-select";

interface ContactDialogContentProps {
    form: UseFormReturn<Interview>;

}

export default function InterviewDialogContent({form}: ContactDialogContentProps) {
    return (
        <div className="grid gap-4 py-4">

            <FormField control={form.control} name={"description"} render={({field}) => (
                <FormInput labelName={"Description"} placeholder={"Description"} required
                           field={field}/>
            )}/>


            <div className={"grid grid-cols-2 gap-4 items-end"}>

                <FormField control={form.control} name={"date"} render={({field}) => (
                    <FormDatePicker labelName={"Date"} field={field}/>
                )}/>

                <FormField control={form.control} name={"company"} render={({field}) => (
                    <FormInput labelName={"Company"} placeholder={"Company"} required
                               field={field}/>
                )}/>

            </div>

            <div className={"grid grid-cols-2 gap-4 items-end"}>

                <FormField control={form.control} name={"type"} render={({field}) => (
                    <FormSelect entries={InterviewType.options} label={"Type"}
                                defaultValue={form.getValues("type")}
                                onValueChange={field.onChange}/>
                )}/>

                <FormField control={form.control} name={"link"} render={({field}) => (
                    <FormInput labelName={"Link"} placeholder={"Link"}
                               field={field}/>
                )}/>

            </div>


            <FormField control={form.control} name={"notes"} render={({field}) => (
                <FormTextarea className={"h-[600px]"} label={"Notes"} placeholder={"Add your notes"} field={field}/>
            )}/>

        </div>
    )
}
