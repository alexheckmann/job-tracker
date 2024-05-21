import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Lightbulb} from "lucide-react";
import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";

interface BenefitsCardProps extends HTMLAttributes<HTMLDivElement> {

}

export function BenefitsCard({className}: BenefitsCardProps) {
    return (
        <Card
            className={cn("drop-shadow-xl shadow-black/10 max-h-[350px]", className)}>
            <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                <div className="mt-1 bg-primary-foreground p-1 rounded-2xl">
                    <Lightbulb/>
                </div>
                <div>
                    <CardTitle>
                        Everything in one place
                    </CardTitle>
                    <CardDescription className="text-md mt-2">
                        Keep your applications, contacts and notes organized to reduce the mental overhead.
                    </CardDescription>
                </div>
            </CardHeader>
        </Card>
    );
}
