import {Button} from "@/components/ui/button";
import Link from "next/link";
import {HTMLAttributes, ReactNode} from "react";
import {ExternalLinkIcon, LinkedinIcon, MailIcon} from "@/components/icons";

interface OpenLinkButtonProps extends HTMLAttributes<HTMLButtonElement> {
    href: string,
    type: "link" | "linkedin" | "email"
}

export function OpenLinkButton({href, type, ...props}: OpenLinkButtonProps) {

    let icon: ReactNode;
    let linkTarget: "_blank" | "_self" = "_blank";

    switch (type) {
        case "email":
            href = `mailto://${href}`
            linkTarget = "_self"
            icon = <MailIcon className={"text-muted-foreground"}/>
            break;
        case "linkedin":
            icon = <LinkedinIcon className={"text-muted-foreground"}/>
            break;
        case "link":
            icon = <ExternalLinkIcon className={"text-muted-foreground"}/>
            break;
        default:
            icon = <ExternalLinkIcon className={"text-muted-foreground"}/>
            break;
    }

    return (
        <Button {...props} variant={"ghost"} asChild>
            <Link href={href} target={linkTarget} className={"flex flex-row gap-1 items-center"}>
                {icon}
            </Link>
        </Button>
    )
}
