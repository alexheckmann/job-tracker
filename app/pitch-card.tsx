import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {buttonVariants} from "@/components/ui/button";
import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";
import Logo from "@/components/logo";
import {DonateIcon, FeedbackIcon, LinkedinIcon} from "@/components/icons";

interface PitchCardProps extends HTMLAttributes<HTMLDivElement> {

}

const LINKEDIN_URL = "https://www.linkedin.com/in/alexander-heckmann/";

export function PitchCard({className}: PitchCardProps) {
    return (
        <Card
            className={cn("flex flex-col justify-center items-center drop-shadow-xl shadow-black/10", className)}>
            <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <Logo
                    className="absolute grayscale-[0%] -top-3 md:-top-12 rounded-full w-24 h-24 aspect-square object-cover"/>
                <CardTitle className="text-center">
                    Pegasus
                </CardTitle>
                <CardDescription className="font-normal text-primary">
                    Job Tracker
                </CardDescription>
            </CardHeader>

            <CardContent className="text-center pb-2">
                <p>
                    Stay on top of your job applications with all tools necessary in
                    one place.
                </p>
            </CardContent>

            <CardFooter className={"gap-2"}>
                <a rel="noreferrer noopener" href="/donate" target="_self"
                   className={buttonVariants({variant: "ghost", size: "sm"})}>
                    <span className="sr-only">Donate</span>
                    <DonateIcon className={"w-5 h-5 text-muted-foreground"}/>
                </a>

                <a rel="noreferrer noopener" href="/feedback" target="_self"
                   className={buttonVariants({variant: "ghost", size: "sm"})}>
                    <span className="sr-only">Feedback</span>
                    <FeedbackIcon className={"w-5 h-5 text-muted-foreground"}/>
                </a>

                <a rel="noreferrer noopener" href={LINKEDIN_URL} target="_blank"
                   className={buttonVariants({variant: "ghost", size: "sm"})}>
                    <span className="sr-only">Linkedin icon</span>
                    <LinkedinIcon className={"w-5 h-5 text-muted-foreground"}/>
                </a>
            </CardFooter>
        </Card>
    );
}
