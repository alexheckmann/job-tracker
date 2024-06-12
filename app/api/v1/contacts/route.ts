import {getContacts, getMongooseIdObject, insertContact, updateContact} from "@/lib/db/db-helpers";
import {NextRequest, NextResponse} from "next/server";
import {HttpStatusCode} from "axios";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {decryptKey} from "@/lib/security/decryptKey";
import {decryptContact} from "@/lib/security/decrypt";
import {getInitializationVector} from "@/lib/security/getInitializationVector";
import {encryptContact} from "@/lib/security/encrypt";


export async function GET() {

    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }

        const decryptedKey = decryptKey(session?.user?.encryptedKey, session?.googleId)
        const results = await getContacts(session?.user?.id)
            .then((contacts) => contacts.map((contact) => {
                // @ts-ignore
                const contactObject = contact.toObject()
                return decryptContact(contactObject, decryptedKey, getInitializationVector(session?.googleId))
            }))

        return NextResponse.json({contacts: results}, {status: HttpStatusCode.Ok})
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

        const newContact = await req.json()
        const encryptedContact = encryptContact(newContact, decryptedKey, getInitializationVector(session?.googleId))

        const createdContact = await insertContact(encryptedContact, session?.user?.id)
            // convert the contact to a plain object instead of a Mongoose document
            .then((contact) => contact.toObject())
            // decrypt the contact before sending it back to the client so that the client can read the data
            .then((contact) => decryptContact(contact, decryptedKey, getInitializationVector(session?.googleId)))

        return NextResponse.json(createdContact, {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function PUT(req: NextRequest) {

    try {
        const session = await getServerSession(authOptions)

        // overwrite the lastUpdate string with a date object to avoid a validation error
        // overwrite user with an ObjectId to avoid an encryption error
        const requestedContact = await req.json()
            .then((data) => ({...data, lastUpdate: new Date(data.lastUpdate), user: getMongooseIdObject(data.user)}))

        if (!session || session?.user?.id.toString() !== requestedContact.user.toString()) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }

        const decryptedKey = decryptKey(session?.user?.encryptedKey, session?.googleId)
        const encryptedContact = encryptContact(requestedContact, decryptedKey, getInitializationVector(session?.googleId))

        const updatedContact = await updateContact(encryptedContact)
            // convert the contact to a plain object instead of a Mongoose document
            .then((contact) => contact.toObject())
            // decrypt the contact before sending it back to the client so that the client can read the data
            .then((contact) => decryptContact(contact, decryptedKey, getInitializationVector(session?.googleId)))
        return NextResponse.json(updatedContact, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
