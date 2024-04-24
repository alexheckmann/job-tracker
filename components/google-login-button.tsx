"use client"

import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {HTMLAttributes, useState} from "react";
import {cn} from "@/lib/utils";
import {Loader2, LogIn} from "lucide-react";

interface GoogleLoginButtonProps extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
}

export function GoogleLoginButton({disabled, className}: GoogleLoginButtonProps) {
    const [loading, setLoading] = useState(false)
    return (
        <Button
            disabled={loading || disabled}
            variant="secondary"
            className={cn(className, "w-[170px]")}
            onClick={() => {
                setLoading(true)
                signIn("google")
            }}>
            {loading ?
                <div className={"flex flex-row gap-2 items-center"}>
                    <Loader2 className={"h-4 w-4 animate-spin"}/>
                    <span className={"animate-pulse"}>Signing in</span>
                </div>
                :
                <div className={"flex flex-row gap-2 items-center"}>
                    <LogIn className={"h-4 w-4"}/>
                    <span>Sign in with Google</span>
                </div>
            }
        </Button>
    )
}
