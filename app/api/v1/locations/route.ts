import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {getUserById, updateUser} from "@/lib/db/db-helpers";
import {HttpStatusCode} from "axios";

export async function POST(req: NextRequest) {
    const newLocation = await req.json().then((data) => data.value)

    try {
        const session = await getServerSession(authOptions)
        const user = await getUserById(session.id)
        user?.locations?.push(newLocation)
        await updateUser(session.id, user!)
        return NextResponse.json({user: user}, {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function DELETE(req: NextRequest) {
    const locationToDelete = await req.json().then((data) => data.value)

    try {
        const session = await getServerSession(authOptions)
        const user = await getUserById(session.id)

        const index = user?.locations?.indexOf(locationToDelete)
        if (index === -1) {
            return NextResponse.json({error: "Role not found"}, {status: HttpStatusCode.NotFound})
        }

        user?.roles!.splice(index!, 1)

        await updateUser(session.id, user!)
        return NextResponse.json({status: HttpStatusCode.NoContent})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
