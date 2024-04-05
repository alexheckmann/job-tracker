import {deleteJob, getJobs, insertJob} from "@/lib/db/db";
import {NextRequest, NextResponse} from "next/server";
import {HttpStatusCode} from "axios";
import {insertJobSchema} from "@/lib/db/schema";

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
    try {
        const results = await getJobs()
        return NextResponse.json({jobs: results}, {status: HttpStatusCode.Ok})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function POST(req: NextRequest) {
    const unvalidatedJob = await req.json()

    const validatedJob = insertJobSchema.parse(unvalidatedJob)

    try {
        const createdJob = await insertJob(validatedJob)
        return NextResponse.json(createdJob[0], {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function PUT() {
    return NextResponse.json(HttpStatusCode.NotImplemented)
}

export async function DELETE(req: NextRequest) {
    const jobId = await req.json().then((data) => data.id)

    try {
        await deleteJob(jobId);
        return NextResponse.json({status: HttpStatusCode.NoContent})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
