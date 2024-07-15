"use client"

import {DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useJobEditDialogStore} from "@/app/data/use-get-data";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Job, JobSchema} from "@/lib/models/job";
import {SubmitButton} from "@/components/submit-button";
import JobDialogContent from "@/app/dashboard/job-dialog-content";
import {useEffect} from "react";
import {useUpdateJob} from "@/app/data/use-update-data";
import DialogContentWrapper from "@/components/dialog-content-wrapper";
import {JobIcon} from "@/components/icons";


interface JobEditDialogProps {
    job: Job
}

export default function JobEditDialog({job}: JobEditDialogProps) {

    const {setData: setIsJobEditDialogOpen} = useJobEditDialogStore()

    const form = useForm<Job>({
        resolver: zodResolver(JobSchema),
        defaultValues: job
    })

    // reset form when the job changes to update the form values
    useEffect(() => {
        form.reset(job)
    }, [job._id]);

    const {
        mutateData: updateJob,
        isPending: isUpdatingJob
    } = useUpdateJob(form.getValues(), setIsJobEditDialogOpen, false)


    return (
        <DialogContentWrapper>
            <Form {...form}>
                <form onSubmit={
                    form.handleSubmit((job: Job) => {
                        updateJob(job)
                    })
                }>

                    <DialogHeader>
                        <DialogTitle className={"flex flex-row gap-2 items-center justify-center sm:justify-start"}>
                            <JobIcon/>
                            Edit job
                        </DialogTitle>
                        <DialogDescription>
                            Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>

                    <JobDialogContent form={form}/>
                    <DialogFooter>
                        <SubmitButton isPending={isUpdatingJob} normalText={"Update"} loadingText={"Updating"}
                                      normalIcon={<JobIcon/>}/>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContentWrapper>
    )
}
