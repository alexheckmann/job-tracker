import {NextRequest, NextResponse} from "next/server";
import {HttpStatusCode} from "axios";
import {deleteInterview} from "@/lib/db/interview-model-helpers";


export async function DELETE(req: NextRequest, {params}: { params: { id: string } }) {
    const {id: interviewId} = params;
    try {
        await deleteInterview(interviewId);
        return NextResponse.json({status: HttpStatusCode.NoContent})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
