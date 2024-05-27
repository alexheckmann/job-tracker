import {toast} from "@/components/ui/use-toast";

export function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(function () {
        toast({
            title: "Copied to clipboard",
            description: "The text was copied to your clipboard.",
            variant: "default"
        })
    }, function (err) {
        toast({
            title: "Error",
            description: "An error occurred while copying the text to your clipboard.",
            variant: "destructive"
        })
    });
}
