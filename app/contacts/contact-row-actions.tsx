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
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import ContactEditDialog from "@/app/contacts/contact-edit-dialog";
import {DeleteIcon, EditIcon, LoadingIcon, OptionsIcon} from "@/components/icons";

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
                                <LoadingIcon/>
                            </>
                            :
                            <>
                                <span className="sr-only">Open menu</span>
                                <OptionsIcon className={"text-muted-foreground"}/>
                            </>
                        }
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">

                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem className={"cursor-pointer font-semibold"}>
                        <DialogTrigger className={"flex flex-row gap-2 w-full items-center"}>
                            <EditIcon/>
                            Edit
                        </DialogTrigger>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className={"gap-2 cursor-pointer text-destructive font-semibold"}
                        onClick={() => mutateContacts()}>

                        <DeleteIcon/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
                <ContactEditDialog contact={contact}/>
            </Dialog>
        </DropdownMenu>
    )
}
