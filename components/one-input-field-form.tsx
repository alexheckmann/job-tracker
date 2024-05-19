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
    type: "roles" | "locations",
    formFieldLabel: string,
    submitFunction: (data: any) => any,
    isPendingSubmission: boolean
}

export function OneInputFieldForm({
                                      existingEntries,
                                      type,
                                      formFieldLabel,
                                      submitFunction,
                                      isPendingSubmission
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
                        title: type === "roles" ?
                            "Role already exists" :
                            "Location already exists",
                        description: "Please enter a different value",
                        variant: "destructive"
                    })
                    return
                }

                const result = await submitFunction(data)
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
                                <Input {...field} disabled={isPendingSubmission}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <SubmitButton className={"sm:w-fit"} showShortcut={false} disabled={isPendingSubmission}>
                    Add
                </SubmitButton>
            </form>
        </Form>
    )
}
