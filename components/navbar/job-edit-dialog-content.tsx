"use client"

import {DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useJobEditDialogStore} from "@/app/data/use-get-data";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Job, JobSchema} from "@/lib/models/job";
import {ClipboardPlus} from "lucide-react";
import {SubmitButton} from "@/components/submit-button";
import JobDialogContent from "@/components/navbar/job-dialog-content";
import {useMemo} from "react";
import {useUpdateJob} from "@/app/data/use-update-data";
import DialogContentWrapper from "@/components/dialog-content-wrapper";


interface JobEditDialogContentProps {
    job: Job
}

export default function JobEditDialogContent({job}: JobEditDialogContentProps) {

    const {setData: setIsJobEditDialogOpen} = useJobEditDialogStore()

    const form = useForm<Job>({
        resolver: zodResolver(JobSchema),
        defaultValues: useMemo(() => job, [job])
    })

    const {
        mutateData: insertJob,
        isPending: isAddingJob
    } = useUpdateJob(form.getValues(), setIsJobEditDialogOpen, false)


    return (
        <DialogContentWrapper>
            <Form {...form}>
                <form onSubmit={
                    form.handleSubmit((job: Job) => {
                        insertJob(job)
                    })
                }>

                    <DialogHeader>
                        <DialogTitle className={"flex flex-row gap-2"}>
                            <ClipboardPlus className={"h-4 w-4"}/>
                            Edit job
                        </DialogTitle>
                        <DialogDescription>
                            Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>

                    <JobDialogContent form={form}/>
                    <DialogFooter>
                        <SubmitButton disabled={isAddingJob}>{isAddingJob ? "Saving job" : "Save job"}</SubmitButton>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContentWrapper>
    )
}