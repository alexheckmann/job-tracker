"use client"

import {useSession} from "next-auth/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {InfoHover} from "@/components/info-hover";
import {RemoveButton} from "@/app/settings/remove-button";
import {useInsertRole} from "@/app/settings/use-string-array-insertion";
import {useRemoveRole} from "@/app/settings/use-string-array-removal";
import {Skeleton} from "@/components/ui/skeleton";
import {getEmptyArray} from "@/lib/get-empty-array";
import AddEntryButton from "@/components/add-entry-button";
import {cn} from "@/lib/utils";
import {useRolesStore} from "@/app/data/use-get-data";


const rolesCardInfoText = "Grouping applications into role types helps with keeping an overview instead of using the exact job titles."

interface RolesEntryProps {
    role: string,
    removeRole: (role: string) => void,
    isPendingRemoval: boolean
}

function RoleEntry({role, removeRole, isPendingRemoval}: RolesEntryProps) {
    return (
        <div className="flex items-center align-middle h-6 space-x-4 justify-between w-full group">
            <p className={cn("text-sm font-medium text-nowrap truncate hover:text-clip leading-none",
                isPendingRemoval && "text-muted-foreground")}>
                {role}
            </p>
            <RemoveButton className={"invisible group-hover:visible"} role={role}
                          onClick={() => removeRole(role)}/>
        </div>
    )
}

export function RolesCard() {

    const {data: session, status} = useSession()
    const isLoading = status !== "authenticated"

    const {data: roles, setData: setRoles} = useRolesStore()

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
                <div className={"grid sm:grid-cols-2 gap-4 items-end content-start h-[104px] overflow-y-auto"}>
                    {isLoading ?
                        getEmptyArray(4).map((_, i) => (
                            <Skeleton key={i} className={"w-full h-6"}/>
                        )) :
                        roles.map((role) => (
                            <RoleEntry key={role} role={role} removeRole={removeRole}
                                       isPendingRemoval={isPendingRemoval}/>
                        ))}
                </div>
                <AddEntryButton existingEntries={roles}
                                submitFunction={submitRole} isPendingSubmission={isPendingSubmission}
                                disabled={status !== "authenticated"}/>
            </CardContent>
        </Card>
    )
}
