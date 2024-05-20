import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Check} from "lucide-react";
import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";

interface PricingCardProps extends HTMLAttributes<HTMLDivElement> {

}

const benefits = ["Organize applications", "All your notes in one place", "Sign up using Google"];

export function PricingCard({className}: PricingCardProps) {
    return (
        <Card className={cn("drop-shadow-xl shadow-black/10", className)}>
            <CardHeader>
                <CardTitle className="flex item-center justify-between">
                    Free
                    <Badge variant="secondary" className="text-sm text-primary">
                        Donations appreciated
                    </Badge>
                </CardTitle>
                <div>
                    <span className="text-3xl font-bold">$0</span>
                    <span className="text-muted-foreground"> /month</span>
                </div>

                <CardDescription>
                    Pegasus is completely free, so you can focus on your next career step.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Button className="w-full">
                    Start for free
                </Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4"/>

            <CardFooter className="flex">
                <div className="space-y-4">
                    {benefits.map(
                        (benefit: string) => (
                            <span
                                key={benefit}
                                className="flex gap-2">
                                    <Check className="text-muted-foreground"/>
                                    <h3 className="ml-2">{benefit}</h3>
                            </span>)
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}
