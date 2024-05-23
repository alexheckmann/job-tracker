"use client"

import {Button} from "@/components/ui/button";
import {signIn, useSession} from "next-auth/react";
import {ChevronRight} from "lucide-react";
import {HTMLAttributes, useState} from "react";
import {cn} from "@/lib/utils";
import {LoadingIcon} from "@/components/icons";

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
                <LoadingIcon/> :
                <ChevronRight className={"w-5 h-5"}/>
            }
        </Button>
    );
}
