import {SignInButton} from "@/components/sign-in-button";
import {TestimonialCard} from "@/app/testimonial-card";
import {PitchCard} from "@/app/pitch-card";
import {PricingCard} from "@/app/pricing-card";
import {BenefitsCard} from "@/app/benefits-card";

export default function Home() {
    return (
        <section className="container grid lg:grid-cols-2 place-items-center py-20 px-4 md:px-8 md:py-32 gap-10">
            <div className="text-center lg:text-start space-y-6 items-center">
                <main className="text-4xl sm:text-5xl md:text-6xl font-bold">
                    <h1 className="inline">
                        <span
                            className="inline bg-gradient-to-r from-[#1FC0F1] via-[#0F80C5] to-[#1866B0] text-transparent bg-clip-text">
                            Streamlining
                        </span>
                        {" your "}
                    </h1>
                    <h2 className="inline">
                        <span
                            className="inline bg-gradient-to-r from-[#FFBC00] to-[#FFCA00] text-transparent bg-clip-text">
                                job search
                        </span>
                        {" process"}
                    </h2>
                </main>

                <p className="text-xl text-muted-foreground w-4/6 md:w-1/2 lg:w-10/12 mx-auto lg:mx-0">
                    Effortlessly navigate your job search process by organizing your applications, contacts and notes.
                </p>

                <SignInButton/>

            </div>

            {/* Hero cards sections */}
            <div className="md:z-10">
                <div
                    className="flex flex-row flex-wrap justify-center md:justify-normal gap-8 relative max-w-full md:w-[700px] md:h-[500px]">
                    {/* Testimonial */}
                    <TestimonialCard className={"order-3 md:order-1 md:absolute w-72 md:w-[340px] md:-top-[15px]"}/>

                    {/* Team */}
                    <PitchCard
                        className={"order-1 md:order-2 md:absolute md:right-[20px] mt-10 md:mt-0 md:top-4 w-72 md:w-80"}/>

                    {/* Pricing */}
                    <PricingCard className={"order-4 md:order-3 md:absolute md:top-[150px] md:left-[50px] w-72"}/>

                    {/* Service */}
                    <BenefitsCard
                        className={"order-2 md:order-4 md:absolute w-72 md:w-[340px] md:-right-[10px] md:bottom-[35px]"}/>
                </div>
            </div>

            {/* Shadow effect */}
            <div className="shadow"></div>
        </section>
    );
};

