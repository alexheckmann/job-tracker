import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {getUserById, updateUser} from "@/lib/db/db-helpers";
import {HttpStatusCode} from "axios";

export async function POST(req: NextRequest) {
    const newKeywords = await req.json().then((data) => data.value)

    try {
        const session = await getServerSession(authOptions)
        const user = await getUserById(session?.user?.id)
        user?.keywords ? user?.keywords.push(newKeywords) : user!.keywords = [newKeywords]
        user?.keywords.sort((a, b) => {
            const aClean = a.replace(/"/g, '');
            const bClean = b.replace(/"/g, '');
            return aClean.localeCompare(bClean);
        })
        await updateUser(session?.user?.id, user!)
        return NextResponse.json(user?.keywords, {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}

export async function DELETE(req: NextRequest) {
    const keywordsToDelete = await req.json()

    try {
        const session = await getServerSession(authOptions)
        const user = await getUserById(session?.user?.id)

        const index = user?.keywords?.indexOf(keywordsToDelete)
        if (index === -1) {
            return NextResponse.json({error: "Keywords not found"}, {status: HttpStatusCode.NotFound})
        }

        user?.keywords!.splice(index!, 1)

        await updateUser(session?.user?.id, user!)
        return NextResponse.json(user?.keywords, {status: HttpStatusCode.Ok})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
