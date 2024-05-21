"use client"

import {loadStripe} from "@stripe/stripe-js";
import {EmbeddedCheckout, EmbeddedCheckoutProvider} from "@stripe/react-stripe-js";
import axios from "axios";

const fetchClientSecret = async () => {
    return await axios.post("/api/v1/embedded-checkout", {
        priceId: process.env.NEXT_PUBLIC_STRIPE_DONATION_ID!
    }).then(res => res.data.client_secret);
}

export default function DonatePage() {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

    const options = {fetchClientSecret}
    return (
        <div className={"pt-8 md:pt-32"}>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout/>
            </EmbeddedCheckoutProvider>
        </div>
    )
}
