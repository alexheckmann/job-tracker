import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";

interface GoogleLoginButtonProps extends HTMLAttributes<HTMLButtonElement> {

}

export function GoogleLoginButton({className}: GoogleLoginButtonProps) {
    return (
        <Button variant="outline" className={cn(className, "w-fit")} onClick={() => signIn("google")}>
            Login with Google
        </Button>
    )
}
