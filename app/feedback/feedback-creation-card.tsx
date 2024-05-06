"use client"

import {useSession} from "next-auth/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {InfoButton} from "@/components/info-button";
import {Ratings} from "@/components/rating";
import {useForm} from "react-hook-form";
import {ContactSchema} from "@/lib/models/contact";
import {zodResolver} from "@hookform/resolvers/zod";
import {Feedback} from "@/lib/models/feedback";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {FormTextarea} from "@/components/form/form-textarea";
import {SubmitButton} from "@/components/submit-button";
import {toast} from "@/components/ui/use-toast";
import {useEffect} from "react";


const rolesCardInfoText = "Feedback is semi-anonymous: only the rating, the text and your user ID will be used if signed in."

export function FeedbackCreationCard() {

    const {data: session} = useSession()

    const form = useForm<Feedback>({
        resolver: zodResolver(ContactSchema),
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

    return (
        <Card>
            <Form {...form}>
                <form onSubmit={
                    form.handleSubmit(async (feedback: Feedback) => {
                        // await axios.post("/api/v1/feedback", feedback)
                        console.log(feedback)

                        toast({
                            title: "Feedback submitted",
                            description: "Thank you for your feedback!",
                            variant: "default"
                        })
                    })
                }>
                    <CardHeader>
                        <CardTitle>
                            Feedback
                        </CardTitle>
                        <CardDescription className={"inline-flex gap-2 align-middle"}>
                            Any type of feedback is appreciated.
                            <InfoButton infoText={rolesCardInfoText}/>
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
                                                        className={"cursor-pointer"} {...field}
                                                        onRatingChange={(rating) => {
                                                            console.log(rating)
                                                            form.setValue("rating", rating)
                                                            console.log(form.getValues())
                                                        }}/>
                                           </FormControl>
                                       </FormItem>
                                   )}/>

                        <FormField control={form.control} name={"feedback"} render={({field}) => (
                            <FormTextarea label={"Feedback"} placeholder={"Add your feedback"} field={field}/>
                        )}/>

                        <SubmitButton showShortcut={false}>Submit feedback</SubmitButton>

                    </CardContent>
                </form>
            </Form>
        </Card>
    )
}
