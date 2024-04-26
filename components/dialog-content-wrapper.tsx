import {DialogContent} from "@/components/ui/dialog";
import {HTMLAttributes} from "react";

interface DialogContentWrapperProps extends HTMLAttributes<HTMLDivElement> {
}

export default function DialogContentWrapper({children}: DialogContentWrapperProps) {
    return (
        <DialogContent className="sm:max-w-[500px] max-h-[90dvh] overflow-x-auto">
            {children}
        </DialogContent>
    )
}
