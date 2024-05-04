import {Row} from "@tanstack/react-table";
import {Contact} from "@/lib/models/contact";
import {useDeleteContact} from "@/app/data/use-delete-data";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Loader2, MoreHorizontal, SquarePen, Trash} from "lucide-react";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import ContactEditDialogContent from "@/components/contact-edit-dialog-content";

export function ContactRowActions({row}: { row: Row<Contact> }) {
    const contact = row.original

    const {mutateData: mutateContacts, isPending: isDeletingContact} = useDeleteContact(contact);

    return (
        <DropdownMenu>
            <Dialog>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled={isDeletingContact}>
                        {isDeletingContact ?
                            <>
                                <span className="sr-only">Deleting entry</span>
                                <Loader2 className={"h-4 w-4 animate-spin"}/>
                            </>
                            :
                            <>
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground"/>
                            </>
                        }
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">

                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem className={"cursor-pointer font-semibold"}>
                        <DialogTrigger className={"flex flex-row gap-2 w-full items-center"}>
                            <SquarePen className={"h-4 w-4"}/>
                            Edit
                        </DialogTrigger>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className={"gap-2 cursor-pointer text-destructive font-semibold"}
                        onClick={() => mutateContacts()}>

                        <Trash className={"h-4 w-4"}/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
                <ContactEditDialogContent contact={contact}/>
            </Dialog>
        </DropdownMenu>
    )
}
