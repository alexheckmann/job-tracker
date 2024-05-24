"use client"

import {useSession} from "next-auth/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {OneInputFieldForm} from "@/components/one-input-field-form";
import {HTMLAttributes, useEffect, useState} from "react";
import {InfoButton} from "@/components/info-button";
import {RemoveButton} from "@/app/settings/remove-button";
import {useInsertKeywords} from "@/app/settings/use-string-array-insertion";
import {useRemoveKeywords} from "@/app/settings/use-string-array-removal";
import {Badge} from "@/components/ui/badge";
import {toast} from "@/components/ui/use-toast";
import {CopyIcon} from "@/components/icons";
import {Button} from "@/components/ui/button";


const rolesCardInfoText = "Save your keywords exactly how you use them on job portals. Some job portals use quotation marks to search for exact phrases."

function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(function () {
        toast({
            title: "Copied to clipboard",
            description: "The text was copied to your clipboard.",
            variant: "default"
        })
    }, function (err) {
        toast({
            title: "Error",
            description: "An error occurred while copying the text to your clipboard.",
            variant: "destructive"
        })
    });
}

interface KeywordsEntryProps extends HTMLAttributes<HTMLDivElement> {
    entry: string,
    removeKeywords: (entry: string) => void,
    isPendingRemoval: boolean
}

function KeywordsEntry({entry, removeKeywords, isPendingRemoval}: KeywordsEntryProps) {

    const [showRemoveButton, setShowRemoveButton] = useState(false)

    return (
        <Badge variant={"outline"} key={entry}
               className="flex items-center align-middle h-6 space-x-4 px-4 gap-2 justify-between cursor-pointer"
               onClick={() => copyToClipboard(entry)}
               onMouseEnter={() => setShowRemoveButton(true)}
               onMouseLeave={() => setShowRemoveButton(false)}
        >
            {entry}
            {showRemoveButton ?
                <RemoveButton disabled={isPendingRemoval} role={entry}
                              onClick={() => removeKeywords(entry)}/> :
                <Button variant="ghost" size="icon" className={"h-6 w-6"}>
                    <CopyIcon className={"h-3 w-3 text-muted-foreground"}/>
                </Button>
            }
        </Badge>
    )
}

export function KeywordsCard() {

    const {data: session, status} = useSession()
    const [keywords, setKeywords] = useState<string[]>([])

    useEffect(() => {
        setKeywords(session?.keywords || [])
    }, [session?.keywords])

    const {mutateData: submitKeywords, isPending: isPendingSubmission} = useInsertKeywords(keywords, setKeywords)
    const {mutateData: removeKeywords, isPending: isPendingRemoval} = useRemoveKeywords(keywords, setKeywords)

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Search keywords
                </CardTitle>
                <CardDescription className={"inline-flex gap-2 align-middle"}>
                    A list of keywords you use to look for roles.
                    <InfoButton infoText={rolesCardInfoText}/>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <OneInputFieldForm existingEntries={keywords} formFieldLabel={"Add keywords"}
                                   submitFunction={submitKeywords} isPendingSubmission={isPendingSubmission}
                                   disabled={status !== "authenticated"}/>
                <div className={"flex flex-row flex-wrap gap-2 items-start max-h-[240px] overflow-y-auto"}>
                    {keywords.map((entry) => (
                        <KeywordsEntry key={entry} entry={entry} removeKeywords={removeKeywords}
                                       isPendingRemoval={isPendingRemoval}/>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
