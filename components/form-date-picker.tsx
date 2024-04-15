"use client"

import {useState} from "react";
import {FormControl, FormItem, FormLabel} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {CalendarIcon} from "@/components/icons";

interface FormDatePickerProps {
    labelName: string,
    field: any
}

export function FormDatePicker({labelName, field}: FormDatePickerProps) {
    const [open, setOpen] = useState(false)

    return (
        <FormItem>
            <div className="flex flex-col gap-2">
                <FormLabel className="text-left">
                    {labelName}
                </FormLabel>

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                                variant={"outline"}
                                aria-expanded={open}
                                className={cn(
                                    "justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2"/>
                                {field.value ? format(field.value, "dd/MM/yy") : <span>Pick a date</span>}
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            defaultMonth={field.value}
                            onDayClick={() => setOpen(false)}
                            // today={undefined}
                            mode="single"
                            weekStartsOn={1}
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </FormItem>
    )
}
