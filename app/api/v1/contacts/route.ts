import {createContact as insertContact, getContacts} from "@/lib/db/db-helpers";
import {NextRequest, NextResponse} from "next/server";
import {HttpStatusCode} from "axios";
import mongoose from "mongoose";
import mongooseConnection from "@/lib/db/mongoose-connection";


export async function GET() {

    if (mongoose.connection.readyState !== mongoose.STATES.connected) {
        await mongooseConnection
    }

    try {
        const results = await getContacts()
        return NextResponse.json({contacts: results}, {status: HttpStatusCode.Ok})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function POST(req: NextRequest) {
    const newContact = await req.json()

    try {
        const createdContact = await insertContact(newContact)
        return NextResponse.json(createdContact, {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

