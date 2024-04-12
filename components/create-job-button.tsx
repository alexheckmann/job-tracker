"use client"

import {useJobCreationDialogStore} from "@/app/data/job-data";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {ClipboardPlus, UserRoundPlus} from "lucide-react";
import JobCreationDialogContent from "@/components/job-creation-dialog-content";
import {useCtrlKeyShortcut} from "@/components/use-ctrl-key-shortcut";

export function CreateJobButton() {
    const {data: isJobCreationDialogOpen, setData: setIsJobCreationDialogOpen} = useJobCreationDialogStore()

    useCtrlKeyShortcut("u", () => {
        setIsJobCreationDialogOpen(true)
    })

    return (
        <Dialog open={isJobCreationDialogOpen} onOpenChange={setIsJobCreationDialogOpen}>
            <DialogTrigger asChild>
                <Button variant={"secondary"} className={"ml-auto w-fit gap-2"}>
                    <ClipboardPlus className={"h-4 w-4"}/>
                    <span>New job</span>
                </Button>
            </DialogTrigger>
            <JobCreationDialogContent/>
        </Dialog>
    );
}
