"use client"

import {useSession} from "next-auth/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {OneInputFieldForm} from "@/components/one-input-field-form";
import {useEffect, useState} from "react";
import {InfoButton} from "@/components/info-button";
import axios from "axios";
import {RemoveButton} from "@/app/settings/remove-button";


const locationsCardInfoText = "Grouping locations of the jobs you are applying to can helps with keeping an overview if you are applying to jobs in multiple locations."

export function LocationsCard() {

    const {data: session} = useSession()
    const [locations, setLocations] = useState<string[]>([])

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
                <OneInputFieldForm existingEntries={locations} type={"locations"}/>
                <div className={"grid grid-cols-2 gap-4 items-end"}>
                    {locations.map((role) => (
                        <div key={role}
                             className="flex items-center align-middle h-6 space-x-4 justify-between w-full group">
                            <p className="text-sm font-medium leading-none">{role}</p>
                            <RemoveButton className={"invisible group-hover:visible"} role={role}
                                          onClick={async () => {
                                              await axios.delete("/api/v1/locations", {data: {value: role}})
                                              setLocations(locations.filter(r => r !== role))
                                          }}/>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
