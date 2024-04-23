import {FormField} from "@/components/ui/form";
import {FormInput} from "@/components/form-input";
import {FormTextarea} from "@/components/form-textarea";
import {FormDatePicker} from "@/components/form-date-picker";

interface ContactDialogContentProps {
    form: any;

}

export default function ContactDialogContent({form}: ContactDialogContentProps) {
    return (
        <div className="grid gap-4 py-4">
            <FormField control={form.control} name={"name"} render={({field}) => (
                <FormInput labelName={"Name"} placeholder={"Name"} required
                           field={field}/>
            )}/>

            <FormField control={form.control} name={"company"} render={({field}) => (
                <FormInput labelName={"Company"} placeholder={"Company"} required
                           field={field}/>
            )}/>

            <div className={"grid grid-cols-2 gap-4 items-end"}>
                <FormField control={form.control} name={"location"} render={({field}) => (
                    <FormInput labelName={"Location"} placeholder={"Location"} required
                               field={field}/>
                )}/>

                <FormField control={form.control} name={"role"} render={({field}) => (
                    <FormInput labelName={"Role"} placeholder={"Role"} required
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
    )
}
