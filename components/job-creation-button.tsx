"use client"

import {useJobCreationDialogStore} from "@/app/data/use-get-data";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {ClipboardPlus} from "lucide-react";
import JobCreationDialogContent from "@/components/job-creation-dialog-content";
import {useCtrlKeyShortcut} from "@/components/use-ctrl-key-shortcut";
import {HTMLAttributes} from "react";

interface JobCreationButtonProps extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean
}

export function JobCreationButton({disabled, ...props}: JobCreationButtonProps) {
    const {data: isJobCreationDialogOpen, setData: setIsJobCreationDialogOpen} = useJobCreationDialogStore()

    useCtrlKeyShortcut("u", () => {
        setIsJobCreationDialogOpen(true)
    })

    return (
        <Dialog open={isJobCreationDialogOpen} onOpenChange={setIsJobCreationDialogOpen}>
            <DialogTrigger asChild>
                <Button {...props} variant={"secondary"} className={"ml-auto w-fit gap-2"}>
                    <ClipboardPlus className={"h-4 w-4"}/>
                    <span>New job</span>
                </Button>
            </DialogTrigger>
            <JobCreationDialogContent/>
        </Dialog>
    );
}
