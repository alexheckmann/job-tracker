import {NextRequest, NextResponse} from "next/server";
import {HttpStatusCode} from "axios";
import {deleteJob} from "@/lib/db/job-model-helpers";

export async function DELETE(req: NextRequest, {params}: { params: { id: string } }) {

    // TODO add auth
    // TODO update interview to remove job reference
    const {id: jobId} = params;
    try {
        await deleteJob(jobId);
        return NextResponse.json({status: HttpStatusCode.NoContent})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
