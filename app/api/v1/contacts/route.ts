import {getContacts, insertContact} from "@/lib/db/db";
import {NextRequest, NextResponse} from "next/server";
import {HttpStatusCode} from "axios";
import {insertContactSchema} from "@/lib/db/schema";


export async function GET() {
    try {
        const results = await getContacts()
        return NextResponse.json({contacts: results}, {status: HttpStatusCode.Ok})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function POST(req: NextRequest) {
    const newContact = await req.json()
    const validatedContact = insertContactSchema.parse(newContact)

    try {
        const createdContact = await insertContact(validatedContact)
        return NextResponse.json(createdContact[0], {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

