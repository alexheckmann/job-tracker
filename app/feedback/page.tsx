"use client"

import {CardContainer} from "@/app/notes/card-container";
import {FeedbackCreationCard} from "@/app/feedback/feedback-creation-card";

export default function FeedbackPage() {
    return (
        <div className="grid items-start justify-center gap-6 rounded-lg p-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
            </div>
            <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
                <CardContainer>
                    <FeedbackCreationCard/>
                </CardContainer>
            </div>
            <div
                className="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
            </div>
        </div>
    )
}
