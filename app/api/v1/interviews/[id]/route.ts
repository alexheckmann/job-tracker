import {NextRequest, NextResponse} from "next/server";
import {deleteInterview} from "@/lib/db/db-helpers";
import {HttpStatusCode} from "axios";


export async function DELETE(req: NextRequest, {params}: { params: { id: string } }) {
    const {id: interviewId} = params;
    try {
        await deleteInterview(interviewId);
        return NextResponse.json({status: HttpStatusCode.NoContent})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
