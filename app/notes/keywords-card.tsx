"use client"

import {useSession} from "next-auth/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useEffect, useState} from "react";
import {InfoHover} from "@/components/info-hover";
import {useInsertKeywords} from "@/app/settings/use-string-array-insertion";
import {useRemoveKeywords} from "@/app/settings/use-string-array-removal";
import {Badge} from "@/components/ui/badge";
import {Skeleton} from "@/components/ui/skeleton";
import {getEmptyArray} from "@/lib/get-empty-array";
import AddEntryButton from "@/components/add-entry-button";
import {NoteEntry} from "@/app/notes/note-entry";


const keywordsCardInfoText = "Save your keywords exactly how you use them on job portals. Some job portals use quotation marks to search for exact phrases."

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

                <div
                    className={"flex flex-row flex-wrap gap-2 items-start h-[240px] content-start overflow-y-auto"}>
                    {isLoading ?
                        getEmptyArray(12).map((_, i) => (
                            <Badge key={i} className={`w-[90px]`} variant={"outline"}>
                                <Skeleton className={"w-full h-4"}/>
                            </Badge>
                        )) :
                        keywords.map((entry) => (
                            <NoteEntry key={entry} entry={entry} removeEntryFunction={removeKeywords}
                                           isPendingRemoval={isPendingRemoval}/>
                        ))}
                </div>
                <AddEntryButton existingEntries={keywords} submitFunction={submitKeywords}
                                isPendingSubmission={isPendingSubmission}
                                disabled={status !== "authenticated"}/>
            </CardContent>
        </Card>
    )
}
