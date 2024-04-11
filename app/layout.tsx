import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import {Analytics} from "@vercel/analytics/react"
import {SpeedInsights} from "@vercel/speed-insights/next"
import Main from "@/app/main";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans"
});

export const metadata: Metadata = {
    title: "Pegasus - Job Tracker",
    description: "Streamlining the job search process by offering an overview",
};

export const viewport: Viewport = {
    maximumScale: 1,
    initialScale: 1,
    viewportFit: "cover",
    width: "device-width",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <div className="flex min-h-screen w-full flex-col">
            <Main>
                {children}
            </Main>
        </div>
        <Analytics/>
        <SpeedInsights/>
        </body>
        </html>
    );
}
