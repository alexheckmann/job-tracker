'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import * as React from 'react';
import {useState} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel,} from '@/components/ui/form';
import {toast} from '@/components/ui/use-toast';
import MultipleSelector from '@/components/ui/multiple-selector';
import {SubmitButton} from "@/components/submit-button";
import {useSession} from "next-auth/react";

const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
});

const FormSchema = z.object({
    frameworks: z.array(optionSchema).min(1),
});

const FormSelectWithInputField = () => {

    const {data: session} = useSession();

    const options = session?.cities.map((city) => ({
        label: city,
        value: city
    })) || [];

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: 'Your submitted data',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
                ),
            });
        }, 500);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="w-2/3 space-y-6 flex flex-row flex-wrap align-middle items-center gap-2">
                <FormField
                    control={form.control}
                    name="frameworks"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Add salary</FormLabel>
                            <FormControl>
                                <MultipleSelector
                                    value={field.value}
                                    onChange={field.onChange}
                                    defaultOptions={options}
                                    maxSelected={1}
                                    placeholder="Select the location..."
                                    hidePlaceholderWhenSelected
                                    disabled={false}
                                    emptyIndicator={
                                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                            no results found.
                                        </p>
                                    }
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <SubmitButton disabled={isLoading} className={"sm:w-fit"} showShortcut={false}>
                    Add
                </SubmitButton>
            </form>
        </Form>
    );
};
export default FormSelectWithInputField;
