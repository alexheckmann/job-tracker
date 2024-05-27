"use client"

import {useSession} from "next-auth/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {OneInputFieldForm} from "@/components/one-input-field-form";
import {HTMLAttributes, useEffect, useState} from "react";
import {InfoHover} from "@/components/info-hover";
import {RemoveButton} from "@/app/settings/remove-button";
import {useInsertKeywords} from "@/app/settings/use-string-array-insertion";
import {useRemoveKeywords} from "@/app/settings/use-string-array-removal";
import {Badge} from "@/components/ui/badge";
import {CopyIcon} from "@/components/icons";
import {Button} from "@/components/ui/button";
import {truncateString} from "@/app/dashboard/job-columns";
import {Skeleton} from "@/components/ui/skeleton";
import {copyToClipboard} from "@/lib/copy-to-clipboard";


const keywordsCardInfoText = "Save your keywords exactly how you use them on job portals. Some job portals use quotation marks to search for exact phrases."

interface KeywordsEntryProps extends HTMLAttributes<HTMLDivElement> {
    entry: string,
    removeKeywords: (entry: string) => void,
    isPendingRemoval: boolean
}

const keywordsEntryMaxLength = 24

function KeywordsEntry({entry, removeKeywords, isPendingRemoval}: KeywordsEntryProps) {

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
    const isLoading = status !== "authenticated"

    useEffect(() => {
        setKeywords(session?.user?.keywords || [])
    }, [session?.user?.keywords])

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
                    <InfoHover infoText={keywordsCardInfoText}/>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <OneInputFieldForm existingEntries={keywords} formFieldLabel={"Add keywords"}
                                   submitFunction={submitKeywords} isPendingSubmission={isPendingSubmission}
                                   disabled={status !== "authenticated"}/>
                <div
                    className={"flex flex-row flex-wrap gap-2 items-start min-h-[200px] content-start max-h-[240px] overflow-y-auto"}>
                    {isLoading ?
                        Array.from({length: 12}, (_, i) => i).map((_, i) => (
                            <Badge key={i} className={`w-[90px]`} variant={"outline"}>
                                    <Skeleton className={"w-full h-4"}/>
                                </Badge>
                        )) :
                        keywords.map((entry) => (
                            <KeywordsEntry key={entry} entry={entry} removeKeywords={removeKeywords}
                                           isPendingRemoval={isPendingRemoval}/>
                        ))}
                </div>
            </CardContent>
        </Card>
    )
}
