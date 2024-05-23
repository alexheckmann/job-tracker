import {getContacts, insertContact, updateContact} from "@/lib/db/db-helpers";
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
        const results = await getContacts(session.id)
        return NextResponse.json({contacts: results}, {status: HttpStatusCode.Ok})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function POST(req: NextRequest) {
    const newContact = await req.json()

    try {
        const session = await getServerSession(authOptions)
        const createdContact = await insertContact(newContact, session.id)
        return NextResponse.json(createdContact, {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function PUT(req: NextRequest) {
    const requestedContact = await req.json().then((data) => ({...data, lastUpdate: new Date(data.lastUpdate)}))

    try {

        const session = await getServerSession(authOptions)

        if (session.id.toString() !== requestedContact.user.toString()) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }

        const updatedContact = await updateContact(requestedContact)
        return NextResponse.json(updatedContact, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
