"use client"

import {useInterviewCreationDialogStore} from "@/app/data/use-get-data";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";
import InterviewCreationDialogContent from "@/components/navbar/interview-creation-dialog-content";
import {InterviewIcon} from "@/components/icons";

interface JobCreationButtonProps extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean
}

export function InterviewCreationButton({disabled, className, ...props}: JobCreationButtonProps) {
    const {
        data: isInterviewCreationDialogOpen,
        setData: setIsInterviewCreationDialogOpen
    } = useInterviewCreationDialogStore()

    return (
        <Dialog open={isInterviewCreationDialogOpen} onOpenChange={setIsInterviewCreationDialogOpen}>
            <DialogTrigger asChild>
                <Button {...props} variant={"secondary"} className={cn("w-fit gap-2", className)}>
                    <InterviewIcon className={"hidden xs:inline-flex"}/>
                    <span>Interview</span>
                </Button>
            </DialogTrigger>
            <InterviewCreationDialogContent/>
        </Dialog>
    );
}
