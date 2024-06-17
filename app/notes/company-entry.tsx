import {HTMLAttributes, useState} from "react";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {copyToClipboard} from "@/lib/copy-to-clipboard";
import {truncateString} from "@/lib/truncate-string";
import {RemoveButton} from "@/app/settings/remove-button";
import {Button} from "@/components/ui/button";
import {CopyIcon} from "@/components/icons";
import {UserCompanyDTO} from "@/app/notes/companies-card";
import {UserCompany} from "@/lib/models/user";

interface KeywordsEntryProps extends HTMLAttributes<HTMLDivElement> {
    entry: UserCompany,
    location: string,
    removeEntry: (entry: UserCompanyDTO) => void,
    isPendingRemoval: boolean
}

const keywordsEntryMaxLength = 24

function CompanyEntry({entry, removeEntry, isPendingRemoval, location}: KeywordsEntryProps) {

    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const companyEntryDTO: UserCompanyDTO = {companyName: entry.name, location: location}

    return (
        <Badge variant={"outline"} key={entry.name}
               className={cn("flex items-center align-middle h-6 space-x-4 pl-4 gap-2 justify-between cursor-pointer max-w-[200px] text-nowrap border-ternary", entry.isFavorite && "border-ternary")}
               onClick={() => copyToClipboard(entry.name)}
               onMouseEnter={() => setShowRemoveButton(true)}
               onMouseLeave={() => setShowRemoveButton(false)}
        >
            {truncateString(entry.name, keywordsEntryMaxLength)}
            {showRemoveButton ?
                <RemoveButton disabled={isPendingRemoval}
                              onClick={() => removeEntry(companyEntryDTO)}/> :
                <Button variant="ghost" size="icon" className={"h-6 w-6"}>
                    <CopyIcon className={"h-3 w-3 text-muted-foreground"}/>
                </Button>
            }
        </Badge>
    )
}
