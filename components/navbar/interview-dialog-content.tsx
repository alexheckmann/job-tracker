import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {FormInput} from "@/components/form/form-input";
import {FormTextarea} from "@/components/form/form-textarea";
import {FormDatePicker} from "@/components/form/form-date-picker";
import {UseFormReturn} from "react-hook-form";
import {Interview, InterviewType} from "@/lib/models/interview";
import {FormSelect} from "@/components/form/form-select";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import {useState} from "react";
import {useJobDataWithClientState} from "@/app/dashboard/job-table";
import {Job} from "@/lib/models/job";

interface ContactDialogContentProps {
    form: UseFormReturn<Interview>;
}

function getJobLabel(job?: Job): string {
    return (job?.exactTitle ? `${job?.exactTitle} - ${job?.company}` : `${job?.role} - ${job?.company}`) ?? ""
}

export default function InterviewDialogContent({form}: ContactDialogContentProps) {
    const [isJobFieldOpen, setIsJobFieldOpen] = useState(false)
    const [jobLabelValue, setJobLabelValue] = useState(getJobLabel(form.getValues("job")) ?? "")
    const {data: jobs} = useJobDataWithClientState()

    const currentJob = jobs.find((job) => (getJobLabel(job) === jobLabelValue))
    const currentJobLabel = getJobLabel(currentJob)

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

                <FormField control={form.control} name={"job"} render={({field}) => (
                    <FormItem className={"flex flex-col"}>
                        <FormLabel>
                            Job
                        </FormLabel>
                        <Popover open={isJobFieldOpen} onOpenChange={setIsJobFieldOpen}>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={isJobFieldOpen}
                                        className={"justify-start gap-2 font-normal"}
                                    >
                                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50"/>
                                        <span className={"truncate"}>
                                            {field.value
                                                ? currentJobLabel :
                                                "Select job"
                                            }
                                        </span>
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className={"w-[300px] p-0"}>
                                <Command className={"max-h-[250px]"}>
                                    <CommandInput placeholder="Search for company..."/>
                                    <CommandList>
                                        <CommandEmpty>No jobs found.</CommandEmpty>
                                        <CommandGroup>
                                            {jobs.map((job) => {
                                                const jobLabel = getJobLabel(job)

                                                return (
                                                    <CommandItem
                                                        key={job._id}
                                                        className={"gap-2"}
                                                        value={jobLabel}
                                                        onSelect={(currentValue) => {
                                                            setJobLabelValue(currentValue === jobLabelValue ? "" : currentValue)
                                                            form.setValue("job", job)
                                                            setIsJobFieldOpen(false)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "h-4 w-4",
                                                                jobLabelValue === jobLabel ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {jobLabel}
                                                    </CommandItem>
                                                )
                                            })}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </FormItem>
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
