import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {getUserById, updateUser} from "@/lib/db/db-helpers";
import {HttpStatusCode} from "axios";

export async function POST(req: NextRequest) {
    const newRole = await req.json().then((data) => data.value)

    try {
        const session = await getServerSession(authOptions)
        const user = await getUserById(session?.user?.id)
        user?.roles ? user?.roles.push(newRole) : user!.roles = [newRole]
        await updateUser(session?.user?.id, user!)
        return NextResponse.json(user?.roles, {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function DELETE(req: NextRequest) {
    const roleToDelete = await req.json()

    try {
        const session = await getServerSession(authOptions)
        const user = await getUserById(session?.user?.id)

        const index = user?.roles?.indexOf(roleToDelete)
        if (index === -1) {
            return NextResponse.json({error: "Role not found"}, {status: HttpStatusCode.NotFound})
        }

        user?.roles!.splice(index!, 1)

        await updateUser(session?.user?.id, user!)
        return NextResponse.json(user?.roles, {status: HttpStatusCode.Ok})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
