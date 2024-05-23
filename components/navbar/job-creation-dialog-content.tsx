"use client"

import {DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useJobCreationDialogStore} from "@/app/data/use-get-data";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Job, JobSchema} from "@/lib/models/job";
import {useCreateJob} from "@/app/data/use-create-data";
import {ClipboardPlus} from "lucide-react";
import {SubmitButton} from "@/components/submit-button";
import JobDialogContent from "@/components/navbar/job-dialog-content";
import DialogContentWrapper from "@/components/dialog-content-wrapper";
import {useSession} from "next-auth/react";

export default function JobCreationDialogContent() {

    const {setData: setIsJobCreationDialogOpen} = useJobCreationDialogStore()
    const {data: session} = useSession()

    const form = useForm<Job>({
        resolver: zodResolver(JobSchema),
        defaultValues: {
            role: session?.roles?.[0] || "",
            company: "",
            location: session?.locations?.[0] || "",
            lastUpdate: new Date(),
            status: "Applied",
            exactTitle: "",
            salary: "",
            isFavorite: false,
            isRecruiter: false,
            isReferral: false,
            notes: "",
            link: ""
        }
    })

    const {
        mutateData: insertJob,
        isPending: isAddingJob
    } = useCreateJob(form.getValues(), setIsJobCreationDialogOpen, false)


    return (
        <DialogContentWrapper>
            <Form {...form}>
                <form onSubmit={
                    form.handleSubmit((job: Job) => {
                        insertJob(job)
                    })
                }>

                    <DialogHeader>
                        <DialogTitle className={"flex flex-row gap-2 justify-center sm:justify-start"}>
                            <ClipboardPlus className={"h-4 w-4"}/>
                            Add job
                        </DialogTitle>
                        <DialogDescription>
                            Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>

                    <JobDialogContent form={form}/>

                    <DialogFooter>
                        <SubmitButton isPending={isAddingJob}>{isAddingJob ? "Adding job" : "Add job"}</SubmitButton>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContentWrapper>
    )
}
