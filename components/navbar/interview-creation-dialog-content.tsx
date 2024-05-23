"use client"

import {DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useInterviewCreationDialogStore} from "@/app/data/use-get-data";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {useCreateInterview} from "@/app/data/use-create-data";
import {SubmitButton} from "@/components/submit-button";
import DialogContentWrapper from "@/components/dialog-content-wrapper";
import {Interview, InterviewSchema} from "@/lib/models/interview";
import InterviewDialogContent from "@/components/navbar/interview-dialog-content";
import {InterviewIcon} from "@/components/icons";

export default function InterviewCreationDialogContent() {

    const {setData: setIsInterviewCreationDialogOpen} = useInterviewCreationDialogStore()

    const form = useForm<Interview>({
        resolver: zodResolver(InterviewSchema),
        defaultValues: {
            description: "",
            company: "",
            date: new Date(),
            type: "Initial Call",
            notes: "",
            link: ""
        }
    })

    const {
        mutateData: insertInterview,
        isPending: isAddingInterview
    } = useCreateInterview(form.getValues(), setIsInterviewCreationDialogOpen, false)

    return (
        <DialogContentWrapper>
            <Form {...form}>
                <form onSubmit={
                    form.handleSubmit((interview: Interview) => {
                        insertInterview(interview)
                    })
                }>

                    <DialogHeader>
                        <DialogTitle className={"flex flex-row gap-2 justify-center sm:justify-start"}>
                            <InterviewIcon/>
                            Add interview
                        </DialogTitle>
                        <DialogDescription>
                            Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>

                    <InterviewDialogContent form={form}/>

                    <DialogFooter>
                        <SubmitButton
                            isPending={isAddingInterview}>{isAddingInterview ? "Adding interview" : "Add interview"}</SubmitButton>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContentWrapper>
    )
}
