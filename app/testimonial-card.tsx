import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";

interface TestimonialCardProps extends HTMLAttributes<HTMLDivElement> {

}

export function TestimonialCard({className}: TestimonialCardProps) {
    return (
        <Card className={cn("drop-shadow-xl shadow-black/10 max-h-[140px]", className)}>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/39348705?v=4"/>
                    <AvatarFallback>AH</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                    <CardTitle className="text-lg">Alex Heckmann</CardTitle>
                    <CardDescription>@alexheckmann</CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                It helped me, so let me help you.
            </CardContent>
        </Card>
    );
}
