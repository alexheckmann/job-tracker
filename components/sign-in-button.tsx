"use client"

import {Button} from "@/components/ui/button";
import {signIn, useSession} from "next-auth/react";
import {ChevronRight, Loader2} from "lucide-react";
import {HTMLAttributes, useState} from "react";
import {cn} from "@/lib/utils";

interface SignInButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline";
}

export function SignInButton({variant, className}: SignInButtonProps) {

    const {status} = useSession()
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Button variant={variant || "outline"} className={cn("gap-2", className)}
                disabled={status === "loading" || isLoading}
                onClick={() => {
                    setIsLoading(true)
                    signIn("google", {callbackUrl: "/dashboard"})
                }}>
            {isLoading ? "Signing in" : "Get started now"}
            {isLoading ?
                <Loader2 className={"h-4 w-4 animate-spin"}/> :
                <ChevronRight className={"w-5 h-5"}/>
            }
        </Button>
    );
}
