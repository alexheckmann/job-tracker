import {HTMLAttributes, useState} from "react";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {copyToClipboard} from "@/lib/copy-to-clipboard";
import {RemoveButton} from "@/app/settings/remove-button";
import {Button} from "@/components/ui/button";
import {CopyIcon, GlobalIcon} from "@/components/icons";
import {BookmarkedCompany} from "@/lib/models/bookmarked-company";

interface CompanyEntryProps extends HTMLAttributes<HTMLDivElement> {
    entry: BookmarkedCompany,
    removeEntryFunction: (entry: BookmarkedCompany) => void,
    isPendingRemoval: boolean
}

export function CompanyEntry({entry, removeEntryFunction, isPendingRemoval}: CompanyEntryProps) {

    const [showRemoveButton, setShowRemoveButton] = useState(false)

    return (
        <Badge variant={"outline"} key={entry.companyName}
               className={cn("flex items-center align-middle h-6 gap-2 justify-between cursor-pointer max-w-[250px] text-nowrap", entry.isFavorite && "border-ternary")}
               onClick={() => copyToClipboard(entry.companyName)}
               onMouseEnter={() => setShowRemoveButton(true)}
               onMouseLeave={() => setShowRemoveButton(false)}
        >
            {entry.location === "Worldwide" && <GlobalIcon className={"h-3 w-3 text-muted-foreground"}/>}
            <span className={"max-w-[170px] truncate"}>
                {entry.companyName}
            </span>
            {showRemoveButton ?
                <RemoveButton disabled={isPendingRemoval}
                              onClick={() => removeEntryFunction(entry)}/> :
                <Button variant="ghost" size="icon" className={"h-6 w-6"} tabIndex={-1} type={"button"}>
                    <CopyIcon className={"h-3 w-3 text-muted-foreground"}/>
                </Button>
            }
        </Badge>
    )
}
