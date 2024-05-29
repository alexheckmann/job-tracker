import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {SubmitButton} from "@/components/submit-button";
import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";
import {Plus} from "lucide-react";

const FormSchema = z.object({
    value: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})


interface OneInputFieldFormProps extends HTMLAttributes<HTMLInputElement> {
    existingEntries: string[],
    formFieldLabel?: string,
    submitFunction: (data: any) => any,
    isPendingSubmission: boolean,
    disabled?: boolean
}

export function OneInputFieldForm({
                                      className,
                                      existingEntries,
                                      formFieldLabel,
                                      submitFunction,
                                      isPendingSubmission,
                                      disabled,
                                      onBlur
                                  }: OneInputFieldFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            value: "",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(async (data) => {
                if (existingEntries.includes(data.value)) {
                    toast({
                        title: "Entry already exists",
                        description: "Please enter a different value",
                        variant: "destructive"
                    })
                    return
                }

                await submitFunction(data)
                form.reset()
            })}
                  className={cn("w-2/3 space-y-6 flex flex-row items-end gap-2", className)}>
                <FormField
                    control={form.control}
                    name="value"
                    render={({field}) => (
                        <FormItem>
                            {formFieldLabel && <FormLabel>{formFieldLabel}</FormLabel>}
                            <FormControl>
                                <Input className={"min-w-[140px]"} {...field}
                                       onBlur={(event) => {
                                           if (field.value.trim() === "") {
                                               onBlur && onBlur(event)
                                           }
                                       }}
                                       disabled={isPendingSubmission || disabled}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <SubmitButton className={"sm:w-fit"} isPending={isPendingSubmission}
                              normalIcon={<Plus className={"h-4 w-4"}/>}
                              disabled={disabled}/>
            </form>
        </Form>
    )
}
