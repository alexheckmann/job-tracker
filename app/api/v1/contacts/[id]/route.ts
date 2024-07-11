import {NextRequest, NextResponse} from "next/server";
import {HttpStatusCode} from "axios";
import {deleteContact} from "@/lib/db/contact-model-helpers";


export async function DELETE(req: NextRequest, {params}: { params: { id: string } }) {
    const {id: contactId} = params;
    try {
        await deleteContact(contactId);
        return NextResponse.json({status: HttpStatusCode.NoContent})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
