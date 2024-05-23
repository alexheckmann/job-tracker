import {NextRequest, NextResponse} from "next/server";
import {deleteInterview, updateInterview} from "@/lib/db/db-helpers";
import {HttpStatusCode} from "axios";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";

export async function PUT(req: NextRequest, {params}: { params: { id: string } }) {
    const requestedInterview = await req.json().then((data) => ({...data, lastUpdate: new Date(data.lastUpdate)}))

    try {

        const session = await getServerSession(authOptions)

        if (session.id.toString() !== requestedInterview.user.toString()) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }

        const updatedInterview = await updateInterview(requestedInterview)
        return NextResponse.json(updatedInterview, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function DELETE(req: NextRequest, {params}: { params: { id: string } }) {
    const {id: interviewId} = params;
    try {
        await deleteInterview(interviewId);
        return NextResponse.json({status: HttpStatusCode.NoContent})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
