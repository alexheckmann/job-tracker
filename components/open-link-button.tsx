import {Button} from "@/components/ui/button";
import Link from "next/link";
import {SquareArrowOutUpRight} from "lucide-react";
import {HTMLAttributes} from "react";

interface OpenLinkButtonProps extends HTMLAttributes<HTMLButtonElement> {
    href: string;
    buttonText: string;
}

export function OpenLinkButton({href, buttonText, ...props}: OpenLinkButtonProps) {

    return (
        <Button {...props} variant={"link"} className={"px-0 gap-2"}>
            <Link href={href} target={"_blank"} className={"flex flex-row gap-1 items-center"}>
                {buttonText}
                <SquareArrowOutUpRight className={"h-3 w-3"}/>
            </Link>
        </Button>
    )
}
