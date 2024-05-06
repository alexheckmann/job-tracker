import {HTMLAttributes, useState} from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Trash, X} from "lucide-react";

/**
 * Props for the RemoveButton component
 */
interface RemoveButtonProps extends HTMLAttributes<HTMLButtonElement> {
}

/**
 * Button to remove an item with a confirmation step
 * @param className Style classes
 * @param onClick Function to call when the button is clicked after the confirmation step
 * @constructor RemoveButton
 */
export function RemoveButton({className, onClick}: RemoveButtonProps) {
    const [isFirstClick, setIsFirstClick] = useState(true)
    return (
        isFirstClick ?
            <Button variant="ghost" size="icon" className={cn("h-6 w-6 text-muted-foreground", className)}
                    onClick={() => setIsFirstClick(false)}>
                <X className="h-3 w-3"/>
            </Button> :
            <Button variant="destructive" size="icon" className={cn("h-6 w-6", className)}
                    onMouseLeave={() => setIsFirstClick(true)}
                    onClick={onClick}>
                <Trash className="h-3 w-3"/>
            </Button>
    )
}
