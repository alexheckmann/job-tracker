"use client"

import {useSession} from "next-auth/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useEffect, useState} from "react";
import {InfoHover} from "@/components/info-hover";
import {RemoveButton} from "@/app/settings/remove-button";
import {useInsertLocation} from "@/app/settings/use-string-array-insertion";
import {useRemoveLocation} from "@/app/settings/use-string-array-removal";
import {Skeleton} from "@/components/ui/skeleton";
import {getEmptyArray} from "@/lib/get-empty-array";
import AddEntryButton from "@/components/add-entry-button";


const locationsCardInfoText = "Grouping locations of the jobs you are applying to can helps with keeping an overview if you are applying to jobs in multiple locations."

export function LocationsCard() {

    const {data: session, status} = useSession()
    const isLoading = status !== "authenticated"

    const [locations, setLocations] = useState<string[]>([])

    const {mutateData: submitLocation, isPending: isPendingSubmission} = useInsertLocation(locations, setLocations)
    const {mutateData: removeLocation, isPending: isPendingRemoval} = useRemoveLocation(locations, setLocations)

    useEffect(() => {
        setLocations(session?.user?.locations || [])
    }, [session?.user?.locations])

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Locations
                </CardTitle>
                <CardDescription className={"inline-flex gap-2 align-middle"}>
                    The different locations you are applying at.
                    <InfoHover infoText={locationsCardInfoText}/>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className={"grid sm:grid-cols-2 gap-4 items-end content-start h-[104px] overflow-y-auto"}>
                    {isLoading ?
                        getEmptyArray(4).map((_, i) => (
                            <Skeleton key={i} className={"w-full h-6"}/>
                        )) :
                        locations.map((location) => (
                            <div key={location}
                                 className="flex items-center align-middle h-6 space-x-4 justify-between w-full group">
                                <p className="text-sm font-medium text-nowrap truncate hover:text-clip leading-none">{location}</p>
                                <RemoveButton className={"invisible group-hover:visible"} role={location}
                                              onClick={() => removeLocation(location)}/>
                            </div>
                        ))}
                </div>
                <AddEntryButton existingEntries={locations}
                                submitFunction={submitLocation} isPendingSubmission={isPendingSubmission}
                                disabled={status !== "authenticated"}/>
            </CardContent>
        </Card>
    )
}
