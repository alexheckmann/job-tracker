import {HTMLAttributes, useState} from "react";
import {Badge} from "@/components/ui/badge";
import {copyToClipboard} from "@/lib/copy-to-clipboard";
import {truncateString} from "@/lib/truncate-string";
import {RemoveButton} from "@/app/settings/remove-button";
import {Button} from "@/components/ui/button";
import {CopyIcon} from "@/components/icons";

interface KeywordsEntryProps extends HTMLAttributes<HTMLDivElement> {
    entry: string,
    removeEntryFunction: (entry: string) => void,
    isPendingRemoval: boolean
}

const keywordsEntryMaxLength: number = 24

export function NoteEntry({entry, removeEntryFunction, isPendingRemoval}: KeywordsEntryProps) {

    const [showRemoveButton, setShowRemoveButton] = useState(false)

    return (
        <Badge variant={"outline"} key={entry}
               className="flex items-center align-middle h-6 space-x-4 pl-4 gap-2 justify-between cursor-pointer max-w-[200px] text-nowrap"
               onClick={() => copyToClipboard(entry)}
               onMouseEnter={() => setShowRemoveButton(true)}
               onMouseLeave={() => setShowRemoveButton(false)}
        >
            {truncateString(entry, keywordsEntryMaxLength)}
            {showRemoveButton ?
                <RemoveButton disabled={isPendingRemoval} role={entry}
                              onClick={() => removeEntryFunction(entry)}/> :
                <Button variant="ghost" size="icon" className={"h-6 w-6"}>
                    <CopyIcon className={"h-3 w-3 text-muted-foreground"}/>
                </Button>
            }
        </Badge>
    )
}
