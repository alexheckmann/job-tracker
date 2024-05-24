import {HTMLAttributes, useState} from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Trash, X} from "lucide-react";
import {LoadingIcon} from "@/components/icons";

const removeButtonSize = "h-6 w-6"
const removeButtonIconSize = "h-3 w-3"

/**
 * Props for the RemoveButton component
 */
interface RemoveButtonProps extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean,
    isLoading?: boolean,
}

/**
 * Button to remove an item with a confirmation step
 * @param className Style classes
 * @param onClick Function to call when the button is clicked after the confirmation step
 * @param disabled Whether the button is disabled
 * @param isLoading Whether the button is in a loading state
 * @constructor RemoveButton
 */
export function RemoveButton({className, onClick, disabled, isLoading}: RemoveButtonProps) {
    const [isFirstClick, setIsFirstClick] = useState(true)
    return (
        isFirstClick ?
            <Button variant="ghost" size="icon" className={cn(removeButtonSize, "text-muted-foreground", className)}
                    disabled={disabled || isLoading}
                    onClick={() => setIsFirstClick(false)}>
                {isLoading ? <LoadingIcon className={removeButtonIconSize}/> : <X className={removeButtonIconSize}/>}
            </Button> :
            <Button variant="destructive" size="icon" className={cn(removeButtonSize, className)}
                    disabled={disabled || isLoading}
                    onMouseLeave={() => setIsFirstClick(true)}
                    onClick={onClick}>
                {isLoading ? <LoadingIcon className={removeButtonIconSize}/> :
                    <Trash className={removeButtonIconSize}/>}
            </Button>
    )
}
