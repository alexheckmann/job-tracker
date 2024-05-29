import {HTMLAttributes, useState} from "react";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {OneInputFieldForm} from "@/components/one-input-field-form";

interface AddEntryButtonProps extends HTMLAttributes<HTMLButtonElement> {
    existingEntries: string[],
    submitFunction: (data: any) => any,
    isPendingSubmission: boolean,
    disabled?: boolean,
}

export default function AddEntryButton({
                                           existingEntries,
                                           submitFunction,
                                           isPendingSubmission,
                                           disabled
                                       }: AddEntryButtonProps) {

    const [isFirstClick, setIsFirstClick] = useState(true)

    async function enhancedSubmitFunction(data: any) {
        await submitFunction(data)
    }

    return (
        isFirstClick ?
            <Button variant={"ghost"} className={"w-fit gap-2"}
                    onClick={() => setIsFirstClick(false)}
                    disabled={disabled}>
                <Plus className={"h-4 w-4"}/>
                Add entry
            </Button> :
            <OneInputFieldForm className={"space-y-0 transition-all animate-in"} existingEntries={existingEntries}
                               submitFunction={enhancedSubmitFunction} isPendingSubmission={isPendingSubmission}
                               onBlur={() => setIsFirstClick(true)}/>
    )
}
