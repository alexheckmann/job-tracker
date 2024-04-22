import {NextRequest, NextResponse} from "next/server";
import {deleteContact, updateContact} from "@/lib/db/db-helpers";
import {HttpStatusCode} from "axios";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";

export async function PUT(req: NextRequest, {params}: { params: { id: string } }) {
    const {id} = params;
    const requestedContact = await req.json().then((data) => ({...data, lastUpdate: new Date(data.lastUpdate)}))

    try {

        const session = await getServerSession(authOptions)

        if (session.id.toString() !== requestedContact.user.toString()) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }

        const updatedContact = await updateContact(id, requestedContact)
        return NextResponse.json(updatedContact, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function DELETE(req: NextRequest, {params}: { params: { id: string } }) {
    const {id: contactId} = params;
    try {
        await deleteContact(contactId);
        return NextResponse.json({status: HttpStatusCode.NoContent})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
