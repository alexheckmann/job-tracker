import {NextRequest, NextResponse} from "next/server";
import {deleteJob, updateJob} from "@/lib/db/db-helpers";
import {HttpStatusCode} from "axios";

export async function PUT(req: NextRequest, {params}: { params: { id: string } }) {
    const {id} = params;
    const requestedJob = await req.json().then((data) => ({...data, lastUpdate: new Date(data.lastUpdate)}))

    try {
        const updatedJob = await updateJob(id, requestedJob)
        return NextResponse.json(updatedJob, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function DELETE(req: NextRequest, {params}: { params: { id: string } }) {
    const {id: jobId} = params;
    try {
        await deleteJob(jobId);
        return NextResponse.json({status: HttpStatusCode.NoContent})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
