import {NextRequest, NextResponse} from "next/server";
import {HttpStatusCode} from "axios";
import {Feedback} from "@/lib/models/feedback";
import {createFeedback} from "@/lib/db/feedback-model-helpers";

export async function POST(req: NextRequest) {
    const newFeedback: Feedback = await req.json()

    try {
        const createdFeedback = await createFeedback(newFeedback.rating, newFeedback.feedback, newFeedback.userId)
        return NextResponse.json(createdFeedback, {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
