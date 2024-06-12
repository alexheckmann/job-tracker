import {getJobs, insertJob, updateJob} from "@/lib/db/db-helpers";
import {NextRequest, NextResponse} from "next/server";
import {HttpStatusCode} from "axios";
import {getServerSession} from "next-auth";

import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {decryptJob} from "@/lib/security/decrypt";
import {encryptJob} from "@/lib/security/encrypt";
import {decryptKey} from "@/lib/security/decryptKey";
import {getInitializationVector} from "@/lib/security/getInitializationVector";


export async function GET() {

    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }

        const decryptedKey = decryptKey(session?.user?.encryptedKey, session?.googleId)
        const results = await getJobs(session?.user?.id)
            .then((jobs) => jobs.map((job) => {
                // @ts-ignore
                const jobObject = job.toObject()
                return decryptJob(jobObject, decryptedKey, getInitializationVector(session?.googleId))
            }))

        return NextResponse.json({jobs: results}, {status: HttpStatusCode.Ok})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function POST(req: NextRequest) {

    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }

        const decryptedKey = decryptKey(session?.user?.encryptedKey, session?.googleId)

        const newJob = await req.json()
        const encryptedJob = encryptJob(newJob, decryptedKey, getInitializationVector(session?.googleId))

        const createdJob = await insertJob(encryptedJob, session?.user?.id)
            // convert the job to a plain object instead of a Mongoose document
            .then((job) => job.toObject())
            // decrypt the job before sending it back to the client so that the client can read the data
            .then((job) => decryptJob(job, decryptedKey, getInitializationVector(session?.googleId)))

        return NextResponse.json(createdJob, {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function PUT(req: NextRequest) {

    try {
        const session = await getServerSession(authOptions)

        // overwrite the lastUpdate field with a date object to avoid a Mongoose validation error,
        // since the serializer usually converts the date to a string
        const requestedJob = await req.json().then((data) => ({...data, lastUpdate: new Date(data.lastUpdate)}))

        if (!session || session?.user?.id.toString() !== requestedJob.user.toString()) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }

        const decryptedKey = decryptKey(session?.user?.encryptedKey, session?.googleId)
        const encryptedJob = encryptJob(requestedJob, decryptedKey, getInitializationVector(session?.googleId))

        const updatedJob = await updateJob(encryptedJob)
            // convert the job to a plain object instead of a Mongoose document
            .then((job) => job.toObject())
            // decrypt the job before sending it back to the client so that the client can read the data
            .then((job) => decryptJob(job, decryptedKey, getInitializationVector(session?.googleId)))
        return NextResponse.json(updatedJob, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
