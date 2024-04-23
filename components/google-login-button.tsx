"use client"

import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {HTMLAttributes, useState} from "react";
import {cn} from "@/lib/utils";
import {Loader2} from "lucide-react";

interface GoogleLoginButtonProps extends HTMLAttributes<HTMLButtonElement> {

}

export function GoogleLoginButton({className}: GoogleLoginButtonProps) {
    const [loading, setLoading] = useState(false)
    return (
        <Button
            disabled={loading}
            variant="outline"
            className={cn(className, "w-fit")}
            onClick={() => {
                setLoading(true)
                signIn("google")
            }}>
            {loading ?
                <div className={"flex flex-row gap-2 items-center"}>
                    <Loader2 className={"h-4 w-4 animate-spin"}/>
                    <span className={"animate-pulse"}>Signing in...</span>
                </div>
                :
                "Login with Google"
            }
        </Button>
    )
}
