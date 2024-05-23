import {NextRequest, NextResponse} from "next/server";
import {deleteJob} from "@/lib/db/db-helpers";
import {HttpStatusCode} from "axios";

export async function DELETE(req: NextRequest, {params}: { params: { id: string } }) {
    const {id: jobId} = params;
    try {
        await deleteJob(jobId);
        return NextResponse.json({status: HttpStatusCode.NoContent})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
