import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {HttpStatusCode} from "axios";
import {decryptKey} from "@/lib/security/decryptKey";
import {getInitializationVector} from "@/lib/security/getInitializationVector";
import {decryptUser} from "@/lib/security/decrypt";
import {encryptUser} from "@/lib/security/encrypt";
import {User} from "@/lib/models/user";
import {getUserById, getUserByIdDecrypted, updateUser} from "@/lib/db/user-model-helpers";

export async function POST(req: NextRequest) {
    const newLocation = await req.json().then((data) => data.value)

    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }

        const decryptedKey = decryptKey(session.user.encryptedKey, session.googleId)

        // @ts-ignore
        const user = await getUserById(session?.user?.id)
            // @ts-ignore
            .then((user) => user.toObject())
            .then((user) => decryptUser(user!, decryptedKey, getInitializationVector(session.googleId)))

        user?.locations!.push(newLocation)

        const encryptedUser = encryptUser(user!, decryptedKey, getInitializationVector(session.googleId))
        await updateUser(session?.user?.id, encryptedUser)
        return NextResponse.json(user?.locations, {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function DELETE(req: NextRequest) {
    const locationToDelete = await req.json()

    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }

        const user = await getUserByIdDecrypted(session?.user?.id, session.user.encryptedKey, session.googleId)

        const index = user?.locations?.indexOf(locationToDelete)
        if (index === -1) {
            return NextResponse.json({error: "Location not found"}, {status: HttpStatusCode.NotFound})
        }

        user?.locations!.splice(index!, 1)

        const encryptedUser: User = encryptUser(user!, decryptKey(session.user.encryptedKey, session.googleId), getInitializationVector(session.googleId))
        await updateUser(session?.user?.id, encryptedUser)
        return NextResponse.json(user?.locations, {status: HttpStatusCode.Ok})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
