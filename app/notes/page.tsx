"use client"

import {CardContainer} from "@/components/card-container";
import {KeywordsCard} from "@/app/notes/keywords-card";


export default function NotesPage() {
    return (
        <div className="items-start justify-center gap-6 rounded-lg p-8 grid lg:grid-cols-2 xl:grid-cols-3">
            <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
                <CardContainer>
                    <KeywordsCard/>
                </CardContainer>
            </div>
            <div className="col-span-2 grid items-start gap-6 lg:col-span-1">

            </div>
            <div
                className="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">

            </div>
        </div>
    )
}
