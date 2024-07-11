import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {HttpStatusCode} from "axios";
import {User} from "@/lib/models/user";
import {encryptUser} from "@/lib/security/encrypt";
import {getInitializationVector} from "@/lib/security/getInitializationVector";
import {decryptKey} from "@/lib/security/decryptKey";
import {getUserByIdDecrypted, updateUser} from "@/lib/db/user-model-helpers";

export async function POST(req: NextRequest) {
    const newRole = await req.json().then((data) => data.value)

    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }

        const user = await getUserByIdDecrypted(session?.user?.id, session.user.encryptedKey, session.googleId)

        user?.roles!.push(newRole)

        const encryptedUser: User = encryptUser(user!, decryptKey(session.user.encryptedKey, session.googleId), getInitializationVector(session.googleId))
        await updateUser(session?.user?.id, encryptedUser)
        return NextResponse.json(user?.roles, {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function DELETE(req: NextRequest) {
    const roleToDelete = await req.json()

    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }

        const user = await getUserByIdDecrypted(session?.user?.id, session.user.encryptedKey, session.googleId)

        const index = user?.roles?.indexOf(roleToDelete)
        if (index === -1) {
            return NextResponse.json({error: "Role not found"}, {status: HttpStatusCode.NotFound})
        }

        user?.roles!.splice(index!, 1)

        const encryptedUser: User = encryptUser(user!, decryptKey(session.user.encryptedKey, session.googleId), getInitializationVector(session.googleId))
        await updateUser(session?.user?.id, encryptedUser)
        return NextResponse.json(user?.roles, {status: HttpStatusCode.Ok})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
