"use client"

import {useSession} from "next-auth/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {OneInputFieldForm} from "@/components/one-input-field-form";
import {useEffect, useState} from "react";
import {InfoButton} from "@/components/info-button";
import axios from "axios";
import {RemoveButton} from "@/app/settings/remove-button";


const rolesCardInfoText = "Grouping applications into role types helps with keeping an overview instead of using the exact job titles."

export function RolesCard() {

    const {data: session} = useSession()
    const [roles, setRoles] = useState<string[]>([])

    useEffect(() => {
        setRoles(session?.roles || [])
    }, [session?.roles])

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Roles
                </CardTitle>
                <CardDescription className={"inline-flex gap-2 align-middle"}>
                    The type of roles you are looking for.
                    <InfoButton infoText={rolesCardInfoText}/>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <OneInputFieldForm existingEntries={roles} type={"roles"}/>
                <div className={"grid grid-cols-2 gap-4 items-end"}>
                    {roles.map((role) => (
                        <div key={role}
                             className="flex items-center align-middle h-6 space-x-4 justify-between w-full group">
                            <p className="text-sm font-medium leading-none">{role}</p>
                            <RemoveButton className={"invisible group-hover:visible"} role={role}
                                          onClick={async () => {
                                              await axios.delete("/api/v1/roles", {data: {value: role}})
                                              setRoles(roles.filter(r => r !== role))
                                          }}/>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
