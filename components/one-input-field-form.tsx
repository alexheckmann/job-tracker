import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {SubmitButton} from "@/components/submit-button";
import {HTMLAttributes} from "react";

const FormSchema = z.object({
    value: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})


interface OneInputFieldFormProps extends HTMLAttributes<HTMLFormElement> {
    existingEntries: string[],
    formFieldLabel: string,
    submitFunction: (data: any) => any,
    isPendingSubmission: boolean,
    disabled?: boolean
}

export function OneInputFieldForm({
                                      existingEntries,
                                      formFieldLabel,
                                      submitFunction,
                                      isPendingSubmission,
                                      disabled
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
                  className="w-2/3 space-y-6 flex flex-row items-end gap-2">
                <FormField
                    control={form.control}
                    name="value"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{formFieldLabel}</FormLabel>
                            <FormControl>
                                <Input className={"min-w-[140px]"} {...field}
                                       disabled={isPendingSubmission || disabled}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <SubmitButton className={"sm:w-fit"} isPending={isPendingSubmission}
                              normalText={"Add"} loadingText={"Adding"}
                              normalIcon={null}
                              disabled={disabled}/>
            </form>
        </Form>
    )
}
