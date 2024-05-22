import * as React from "react";
import {HTMLAttributes, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import {CheckIcon} from "@radix-ui/react-icons";
import {ChevronDown} from "lucide-react";

interface InputMultiSelectProps extends HTMLAttributes<HTMLSelectElement> {
    options: string[],
    onSelectFunction: (updater: any) => void
}

export default function InputMultiSelect({options, onSelectFunction}: InputMultiSelectProps) {
    const title = "Status"

    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set())

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button className={cn("gap-2", selectedOptions.size > 0 && "bg-secondary")} variant={"outline"}>
                    {title}
                    <ChevronDown className={"h-4 w-4"}/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className={"w-[200px] p-0"} align={"start"}>
                <Command>
                    <CommandInput placeholder={title}/>
                    <CommandList>
                        <CommandEmpty>
                            No results found.
                        </CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedOptions.has(option)

                                return (
                                    <CommandItem value={option} key={option} onSelect={() => {
                                        if (isSelected) {
                                            setSelectedOptions(prevState => {
                                                prevState.delete(option)
                                                return new Set(prevState)
                                            })

                                        } else {
                                            setSelectedOptions(prevState => {
                                                return new Set(prevState.add(option))
                                            })
                                        }
                                        const onSelectFunctionParams = Array.from(selectedOptions)
                                        onSelectFunction(onSelectFunctionParams.length ? onSelectFunctionParams : undefined)
                                    }}>
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <CheckIcon className={cn("h-4 w-4")}/>
                                        </div>
                                        <span>
                                            {option}
                                        </span>
                                    </CommandItem>
                                )
                            })}
                            {selectedOptions.size > 0 && (
                                <>
                                    <CommandSeparator/>
                                    <CommandGroup>
                                        <CommandItem
                                            onSelect={() => {
                                                setSelectedOptions(new Set())
                                                onSelectFunction(undefined)
                                                setIsOpen(false)
                                            }}
                                            className="justify-center text-center">
                                            Clear selection
                                        </CommandItem>
                                    </CommandGroup>
                                </>
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )


}
