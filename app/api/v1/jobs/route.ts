import {getJobs, insertJob} from "@/lib/db/db";
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
    const newJob = await req.json()
    const validatedJob = insertJobSchema.parse(newJob)

    try {
        const createdJob = await insertJob(validatedJob)
        return NextResponse.json(createdJob[0], {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

