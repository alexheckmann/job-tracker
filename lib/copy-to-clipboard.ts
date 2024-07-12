import {toast} from "@/components/ui/use-toast";

/**
 * Copy the given text to the clipboard.
 * @param text The text to copy to the clipboard.
 * @returns void
 */
export function copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(function (): void {
        toast({
            title: "Copied to clipboard",
            description: "The text was copied to your clipboard.",
            variant: "default"
        })
    }, function (err): void {
        toast({
            title: "Error",
            description: `An error occurred while copying the text to your clipboard.: ${err}`,
            variant: "destructive"
        })
    });
}
