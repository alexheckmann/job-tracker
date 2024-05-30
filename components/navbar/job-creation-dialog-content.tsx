"use client"

import {DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useJobCreationDialogStore, useLocationsStore} from "@/app/data/use-get-data";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Job, JobSchema} from "@/lib/models/job";
import {useCreateJob} from "@/app/data/use-create-data";
import {SubmitButton} from "@/components/submit-button";
import JobDialogContent from "@/components/navbar/job-dialog-content";
import DialogContentWrapper from "@/components/dialog-content-wrapper";
import {useSession} from "next-auth/react";
import {JobIcon} from "@/components/icons";

export default function JobCreationDialogContent() {

    const {setData: setIsJobCreationDialogOpen} = useJobCreationDialogStore()
    const {data: session} = useSession()
    const {data: locations} = useLocationsStore()

    const form = useForm<Job>({
        resolver: zodResolver(JobSchema),
        defaultValues: {
            role: session?.user?.roles?.[0] || "",
            company: "",
            location: locations[0] || "",
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

    // set location to first location in global state here since the useForm does not update when the global state updates,
    // hence the location will be empty on first render
    form.setValue("location", locations[0] || "")

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
                        <DialogTitle className={"flex flex-row gap-2 items-center justify-center sm:justify-start"}>
                            <JobIcon/>
                            Add job
                        </DialogTitle>
                        <DialogDescription>
                            Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>

                    <JobDialogContent form={form}/>

                    <DialogFooter>
                        <SubmitButton isPending={isAddingJob} normalText={"Add"} loadingText={"Adding"}
                                      normalIcon={<JobIcon/>}/>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContentWrapper>
    )
}
