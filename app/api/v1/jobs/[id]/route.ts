import {NextRequest, NextResponse} from "next/server";
import {selectJobSchema} from "@/lib/db/schema";
import {deleteJob, updateJob} from "@/lib/db/db";
import {HttpStatusCode} from "axios";

export async function PUT(req: NextRequest, {params}: { params: { id: number } }) {
    const {id} = params;
    const requestedJob = await req.json().then((data) => ({...data, lastUpdate: new Date(data.lastUpdate)}))

    try {
        const validatedJob = selectJobSchema.parse(requestedJob)
        const updatedJob = await updateJob(id, validatedJob)
        return NextResponse.json(updatedJob[0], {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function DELETE(req: NextRequest, {params}: { params: { id: number } }) {
    const {id: jobId} = params;
    try {
        await deleteJob(jobId);
        return NextResponse.json({status: HttpStatusCode.NoContent})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
