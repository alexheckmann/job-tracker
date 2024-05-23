"use client"

import {useJobCreationDialogStore} from "@/app/data/use-get-data";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import JobCreationDialogContent from "@/components/navbar/job-creation-dialog-content";
import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";
import {JobIcon} from "@/components/icons";

interface JobCreationButtonProps extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean
}

export function JobCreationButton({disabled, className, ...props}: JobCreationButtonProps) {
    const {data: isJobCreationDialogOpen, setData: setIsJobCreationDialogOpen} = useJobCreationDialogStore()

    return (
        <Dialog open={isJobCreationDialogOpen} onOpenChange={setIsJobCreationDialogOpen}>
            <DialogTrigger asChild>
                <Button {...props} variant={"secondary"} className={cn("w-fit gap-2", className)}>
                    <JobIcon className={"hidden xs:inline-flex"}/>
                    <span>Job</span>
                </Button>
            </DialogTrigger>
            <JobCreationDialogContent/>
        </Dialog>
    );
}
