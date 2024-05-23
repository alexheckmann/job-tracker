import {Interview, InterviewSchema} from "@/lib/models/interview";
import DialogContentWrapper from "@/components/dialog-content-wrapper";
import {useInterviewEditDialogStore} from "@/app/data/use-get-data";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMemo} from "react";
import {useUpdateInterview} from "@/app/data/use-update-data";
import {Form} from "@/components/ui/form";
import {DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {InterviewIcon} from "@/components/icons";
import InterviewDialogContent from "@/components/navbar/interview-dialog-content";
import {SubmitButton} from "@/components/submit-button";

interface InterviewEditDialogContentProps {
    interview: Interview
}

export default function InterviewEditDialogContent({interview}: InterviewEditDialogContentProps) {

    const {setData: setIsInterviewEditDialogOpen} = useInterviewEditDialogStore()

    const form = useForm<Interview>({
        resolver: zodResolver(InterviewSchema),
        defaultValues: useMemo(() => interview, [interview])
    })

    const {
        mutateData: updateInterview,
        isPending: isUpdatingInterview
    } = useUpdateInterview(form.getValues(), setIsInterviewEditDialogOpen, false)

    return (
        <DialogContentWrapper>
            <Form {...form}>
                <form onSubmit={
                    form.handleSubmit((interview: Interview) => {
                        updateInterview(interview)
                    })
                }>
                    <DialogHeader>
                        <DialogTitle className={"flex flex-row gap-2 justify-center sm:justify-start"}>
                            <InterviewIcon/>
                            Edit interview
                        </DialogTitle>
                        <DialogDescription>
                            Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>

                    <InterviewDialogContent form={form}/>

                    <DialogFooter>
                        <SubmitButton normalText={"Update"} loadingText={"Updating"}
                                      normalIcon={<InterviewIcon/>}
                                      isPending={isUpdatingInterview}/>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContentWrapper>
    )

}
