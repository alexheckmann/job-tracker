import {Card} from "@/components/ui/card";
import {HTMLAttributes} from "react";

interface FullPageCardProps extends HTMLAttributes<HTMLDivElement> {

}

export default function FullPageCard({children}: FullPageCardProps) {
    return (
        <main className="flex flex-1 flex-col gap-4 p-2 md:gap-8 md:p-8 max-h-[88dvh]">
            <div className="grid gap-4 md:gap-8 bg-white max-h-[88dvh]">
                <Card className="max-w-full h-[88dvh] overflow-x-auto">
                    {children}
                </Card>
            </div>
        </main>
    )
}
