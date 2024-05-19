"use client"

import {useSession} from "next-auth/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {OneInputFieldForm} from "@/components/one-input-field-form";
import {useEffect, useState} from "react";
import {InfoButton} from "@/components/info-button";
import {RemoveButton} from "@/app/settings/remove-button";
import {useInsertLocation} from "@/app/settings/use-string-array-insertion";
import {useRemoveLocation} from "@/app/settings/use-string-array-removal";


const locationsCardInfoText = "Grouping locations of the jobs you are applying to can helps with keeping an overview if you are applying to jobs in multiple locations."

export function LocationsCard() {

    const {data: session, status} = useSession()
    const [locations, setLocations] = useState<string[]>([])

    const {mutateData: submitLocation, isPending: isPendingSubmission} = useInsertLocation(locations, setLocations)
    const {mutateData: removeLocation, isPending: isPendingRemoval} = useRemoveLocation(locations, setLocations)

    useEffect(() => {
        setLocations(session?.locations || [])
    }, [session?.locations])

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Locations
                </CardTitle>
                <CardDescription className={"inline-flex gap-2 align-middle"}>
                    The different locations you are applying at.
                    <InfoButton infoText={locationsCardInfoText}/>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <OneInputFieldForm existingEntries={locations} type={"locations"} formFieldLabel={"Add location"}
                                   submitFunction={submitLocation} isPendingSubmission={isPendingSubmission}
                                   disabled={status !== "authenticated"}/>
                <div className={"grid sm:grid-cols-2 gap-4 items-end"}>
                    {locations.map((location) => (
                        <div key={location}
                             className="flex items-center align-middle h-6 space-x-4 justify-between w-full group">
                            <p className="text-sm font-medium leading-none">{location}</p>
                            <RemoveButton className={"invisible group-hover:visible"} role={location}
                                          onClick={() => removeLocation(location)}/>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
