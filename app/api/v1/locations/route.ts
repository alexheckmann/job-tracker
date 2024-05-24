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
        user?.locations ? user?.locations.push(newLocation) : user!.locations = [newLocation]
        await updateUser(session.id, user!)
        return NextResponse.json(user?.locations, {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function DELETE(req: NextRequest) {
    const locationToDelete = await req.json()

    try {
        const session = await getServerSession(authOptions)
        const user = await getUserById(session.id)

        const index = user?.locations?.indexOf(locationToDelete)
        if (index === -1) {
            return NextResponse.json({error: "Location not found"}, {status: HttpStatusCode.NotFound})
        }

        user?.locations!.splice(index!, 1)

        await updateUser(session.id, user!)
        return NextResponse.json(user?.locations, {status: HttpStatusCode.Ok})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
