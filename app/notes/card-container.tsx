import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";

export function CardContainer({
                                  className,
                                  ...props
                              }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "flex items-center justify-center [&>div]:w-full",
                className
            )}
            {...props}
        />
    )
}
