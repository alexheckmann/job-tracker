import {ReactNode} from "react";
import {Button} from "@/components/ui/button";
import {LoadingIcon} from "@/components/icons";
import Shortcut from "@/components/shortcut";

interface SubmitButtonProps {
    children: ReactNode;
    disabled?: boolean;
}

export function SubmitButton({children, disabled = false}: SubmitButtonProps) {

    return (
        <Button type="submit" className={"gap-2 sm:w-[140px]"} disabled={disabled}>
            <span>{children}</span>
            {disabled ?
                <LoadingIcon/> :
                <Shortcut keys={["Ctrl", "M"]}/>
            }
        </Button>
    )
}
