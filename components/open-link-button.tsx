import {Button} from "@/components/ui/button";
import Link from "next/link";
import {SquareArrowOutUpRight} from "lucide-react";

interface OpenLinkButtonProps {
    href: string;
    buttonText: string;
}

export function OpenLinkButton({href, buttonText}: OpenLinkButtonProps) {

    return (
        <Button variant={"link"} className={"px-0 gap-2"}>
            <Link href={href} target={"_blank"} className={"flex flex-row gap-1 items-center"}>
                {buttonText}
                <SquareArrowOutUpRight className={"h-3 w-3"}/>
            </Link>
        </Button>
    )
}
