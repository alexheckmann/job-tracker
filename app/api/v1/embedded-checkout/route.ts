import {NextRequest, NextResponse} from "next/server";
import {HttpStatusCode} from "axios";
import {stripe} from "@/lib/payments/stripe";

export async function POST(req: NextRequest) {
    try {
        const {priceId} = await req.json();

        const session = await stripe.checkout.sessions.create({
            ui_mode: "embedded",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                },
            ],
            mode: "payment",
            return_url: `${req.headers.get("origin")}/thanks?session_id={CHECKOUT_SESSION_ID}`,
        });

        return NextResponse.json({id: session.id, client_secret: session.client_secret});
    } catch (error) {
        console.log(error)
        return NextResponse.json({status: HttpStatusCode.InternalServerError})
    }
}
