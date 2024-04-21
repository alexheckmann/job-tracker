import {createJob as insertJob, getJobs} from "@/lib/db/db-helpers";
import {NextRequest, NextResponse} from "next/server";
import {HttpStatusCode} from "axios";
import mongoose from "mongoose";
import mongooseConnection from "@/lib/db/mongoose-connection";


export async function GET() {

    if (mongoose.connection.readyState !== mongoose.STATES.connected) {
        await mongooseConnection
    }

    try {
        const results = await getJobs()
        return NextResponse.json({jobs: results}, {status: HttpStatusCode.Ok})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function POST(req: NextRequest) {
    const newJob = await req.json()

    try {
        const createdJob = await insertJob(newJob)
        return NextResponse.json(createdJob, {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

