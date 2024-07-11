import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {HttpStatusCode} from "axios";
import {BookmarkedCompany, BookmarkedCompanySchema} from "@/lib/models/bookmarked-company";
import {getBookmarkedCompanies, insertBookmarkedCompany} from "@/lib/db/bookmarked-company-helpers";
import {encryptBookmarkedCompany} from "@/lib/security/encrypt";
import {decryptKey} from "@/lib/security/decryptKey";
import {getInitializationVector} from "@/lib/security/getInitializationVector";
import {decryptBookmarkedCompany} from "@/lib/security/decrypt";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)

    try {

        if (!session) {
            return NextResponse.json({error: "Unauthorized"}, {status: HttpStatusCode.Unauthorized})
        }


        const decryptedKey = decryptKey(session?.user?.encryptedKey, session?.googleId)

        const newCompany = await req.json()

        const validation = BookmarkedCompanySchema.safeParse(newCompany)
        if (!validation.success) {
            return NextResponse.json({error: validation.error}, {status: HttpStatusCode.BadRequest})
        }

        const encryptedBookmarkedCompany = encryptBookmarkedCompany(validation.data, decryptedKey, getInitializationVector(session?.googleId))

        const createdBookmarkedCompany = await insertBookmarkedCompany(encryptedBookmarkedCompany, session.user.id)
            // convert the job to a plain object instead of a Mongoose document
            .then((bookmarkedCompany) => bookmarkedCompany.toObject())
            // decrypt the job before sending it back to the client so that the client can read the data
            .then((bookmarkedCompany) => decryptBookmarkedCompany(bookmarkedCompany, decryptedKey, getInitializationVector(session?.googleId)))


        return NextResponse.json(createdBookmarkedCompany, {status: HttpStatusCode.Created})
    } catch (error) {
        return NextResponse.json({error}, {status: HttpStatusCode.InternalServerError})
    }
}
