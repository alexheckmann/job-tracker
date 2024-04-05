import {NextRequest, NextResponse} from "next/server";
import {selectJobSchema} from "@/lib/db/schema";
import {updateJob} from "@/lib/db/db";
import {HttpStatusCode} from "axios";

export async function PUT(req: NextRequest, {params}: { params: { id: number } }) {
    const {id} = params;
    const requestedJob = await req.json().then((data) => ({...data, lastUpdate: new Date(data.lastUpdate)}))
    const validatedJob = selectJobSchema.parse(requestedJob)
    const updatedJob = await updateJob(id, validatedJob)
    return NextResponse.json({row: updatedJob}, {status: HttpStatusCode.Ok});
}
