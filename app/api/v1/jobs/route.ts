import {getJobs, insertJob, updateJob} from "@/lib/db/db-helpers";
import {NextRequest, NextResponse} from "next/server";
import {HttpStatusCode} from "axios";
import mongoose from "mongoose";
import mongooseConnection from "@/lib/db/mongoose-connection";
import {getServerSession} from "next-auth";

import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";


export async function GET() {

    if (mongoose.connection.readyState !== mongoose.STATES.connected) {
        await mongooseConnection
    }

    try {
        const session = await getServerSession(authOptions)
        const results = await getJobs(session?.user?.id)

        return NextResponse.json({jobs: results}, {status: HttpStatusCode.Ok})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function POST(req: NextRequest) {
    const newJob = await req.json()

    try {
        const session = await getServerSession(authOptions)
        const createdJob = await insertJob(newJob, session?.user?.id)
        return NextResponse.json(createdJob, {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function PUT(req: NextRequest) {
    const requestedJob = await req.json().then((data) => ({...data, lastUpdate: new Date(data.lastUpdate)}))

    try {

        const session = await getServerSession(authOptions)

        if (session?.user?.id.toString() !== requestedJob.user.toString()) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }

        const updatedJob = await updateJob(requestedJob)
        return NextResponse.json(updatedJob, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
