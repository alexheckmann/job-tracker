"use client"

import {useSession} from "next-auth/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {InfoHover} from "@/components/info-hover";
import {Ratings} from "@/components/rating";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Feedback, feedbackMaxValueConstraints, FeedbackSchema} from "@/lib/models/feedback";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {FormTextarea} from "@/components/form/form-textarea";
import {SubmitButton} from "@/components/submit-button";
import {toast} from "@/components/ui/use-toast";
import {useEffect} from "react";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";


const rolesCardInfoText = "Feedback is semi-anonymous: only the rating, the text and your user ID will be used if signed in."

export function FeedbackCreationCard() {

    const {data: session} = useSession()

    const form = useForm<Feedback>({
        resolver: zodResolver(FeedbackSchema),
        defaultValues: {
            rating: 0,
            feedback: "",
            userId: session?.id || "anonymous"
        }
    })

    // Set the user ID to the session ID if the session becomes available
    useEffect(() => {
        form.setValue("userId", session?.id || "anonymous")
    }, [session?.id]);

    const {mutate: submitFeedback, isPending} = useMutation({
        mutationFn: async (feedback: Feedback) => {
            return await axios.post<Feedback>("/api/v1/feedback", feedback)
        },
        onSuccess: async () => {
            toast({
                title: "Feedback submitted",
                description: "Thank you for your feedback!",
                variant: "default"
            })

            form.reset()
        },
        onError: () => {
            toast({
                title: "Error submitting feedback",
                description: "An error occurred while submitting your feedback. Please try again later.",
                variant: "destructive"
            })
        }
    })

    return (
        <Card>
            <Form {...form}>
                <form onSubmit={
                    form.handleSubmit(async (feedback: Feedback) => {
                        submitFeedback(feedback)
                        }
                    )}>
                    <CardHeader>
                        <CardTitle>
                            Feedback
                        </CardTitle>
                        <CardDescription className={"inline-flex gap-2 align-middle"}>
                            Any type of feedback is appreciated.
                            <InfoHover infoText={rolesCardInfoText}/>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 py-4 align-middle items-center">

                        <FormField name={"rating"} control={form.control}
                                   render={({field}) => (

                                       <FormItem>
                                           <FormLabel>
                                               Rating
                                           </FormLabel>
                                           <FormControl>
                                               <Ratings rating={0} variant={"yellow"} size={24}
                                                        totalStars={feedbackMaxValueConstraints.rating}
                                                        className={"cursor-pointer"} {...field}
                                                        onRatingChange={(rating) => {
                                                            form.setValue("rating", rating)
                                                        }}/>
                                           </FormControl>
                                       </FormItem>
                                   )}/>

                        <FormField control={form.control} name={"feedback"} render={({field}) => (
                            <FormTextarea label={"Feedback"} placeholder={"Add your feedback"} field={field}/>
                        )}/>

                        <SubmitButton isPending={isPending}
                                      normalText={"Submit feedback"}
                                      loadingText={"Submitting"}
                                      normalIcon={null}
                        />
                    </CardContent>
                </form>
            </Form>
        </Card>
    )
}
