"use client"

import {useSession} from "next-auth/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {OneInputFieldForm} from "@/components/one-input-field-form";
import {useEffect, useState} from "react";
import {InfoHover} from "@/components/info-hover";
import {RemoveButton} from "@/app/settings/remove-button";
import {useInsertRole} from "@/app/settings/use-string-array-insertion";
import {useRemoveRole} from "@/app/settings/use-string-array-removal";
import {Skeleton} from "@/components/ui/skeleton";
import getEmptyArray from "@/lib/get-empty-array";


const rolesCardInfoText = "Grouping applications into role types helps with keeping an overview instead of using the exact job titles."

export function RolesCard() {

    const {data: session, status} = useSession()
    const isLoading = status !== "authenticated"

    const [roles, setRoles] = useState<string[]>([])

    useEffect(() => {
        setRoles(session?.user?.roles || [])
    }, [session?.user?.roles])

    const {mutateData: submitRole, isPending: isPendingSubmission} = useInsertRole(roles, setRoles)
    const {mutateData: removeRole, isPending: isPendingRemoval} = useRemoveRole(roles, setRoles)

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Roles
                </CardTitle>
                <CardDescription className={"inline-flex gap-2 align-middle"}>
                    The type of roles you are looking for.
                    <InfoHover infoText={rolesCardInfoText}/>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <OneInputFieldForm existingEntries={roles} formFieldLabel={"Add role"}
                                   submitFunction={submitRole} isPendingSubmission={isPendingSubmission}
                                   disabled={status !== "authenticated"}/>
                <div className={"grid sm:grid-cols-2 gap-4 items-end max-h-[104px] overflow-y-auto"}>
                    {isLoading ?
                        getEmptyArray(4).map((_, i) => (
                            <Skeleton key={i} className={"w-full h-6"}/>
                        )) :
                        roles.map((role) => (
                            <div key={role}
                                 className="flex items-center align-middle h-6 space-x-4 justify-between w-full group">
                                <p className="text-sm font-medium leading-none">{role}</p>
                                <RemoveButton className={"invisible group-hover:visible"} role={role}
                                              onClick={() => removeRole(role)}/>
                            </div>
                        ))}
                </div>
            </CardContent>
        </Card>
    )
}
