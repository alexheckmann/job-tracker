import {getInterviews, getMongooseIdObject, insertInterview, updateInterview} from "@/lib/db/db-helpers";
import {NextRequest, NextResponse} from "next/server";
import {HttpStatusCode} from "axios";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {decryptKey} from "@/lib/security/decryptKey";
import {decryptInterview} from "@/lib/security/decrypt";
import {getInitializationVector} from "@/lib/security/getInitializationVector";
import {encryptInterview} from "@/lib/security/encrypt";


export async function GET() {

    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }

        const decryptedKey = decryptKey(session?.user?.encryptedKey, session?.googleId)
        const results = await getInterviews(session.user.id)
            .then((interviews) => interviews.map((interview) => {
                // @ts-ignore
                const interviewObject = interview.toObject()
                return decryptInterview(interviewObject, decryptedKey, getInitializationVector(session.googleId))
            }))

        return NextResponse.json({interviews: results}, {status: HttpStatusCode.Ok})
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

        const newInterview = await req.json()
        const encryptedInterview = encryptInterview(newInterview, decryptedKey, getInitializationVector(session?.googleId))

        const createdInterview = await insertInterview(encryptedInterview, session?.user?.id)
            // convert the interview to a plain object instead of a Mongoose document
            .then((interview) => interview.toObject())
            // decrypt the interview before sending it back to the client so that the client can read the data
            .then((interview) => decryptInterview(interview, decryptedKey, getInitializationVector(session?.googleId)))

        return NextResponse.json(createdInterview, {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function PUT(req: NextRequest) {

    try {
        const session = await getServerSession(authOptions)

        // overwrite the lastUpdate field with a date object to avoid a validation error
        // overwrite user with an ObjectId to avoid an encryption error
        const requestedInterview = await req.json()
            .then((data) => ({...data, lastUpdate: new Date(data.lastUpdate), user: getMongooseIdObject(data.user)}))

        if (!session || session?.user?.id.toString() !== requestedInterview.user.toString()) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }

        const decryptedKey = decryptKey(session?.user?.encryptedKey, session?.googleId)
        const encryptedInterview = encryptInterview(requestedInterview, decryptedKey, getInitializationVector(session?.googleId))

        const updatedInterview = await updateInterview(encryptedInterview)
            // convert the interview to a plain object instead of a Mongoose document
            .then((interview) => interview.toObject())
            // decrypt the interview before sending it back to the client so that the client can read the data
            .then((interview) => decryptInterview(interview, decryptedKey, getInitializationVector(session?.googleId)))
        return NextResponse.json(updatedInterview, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
