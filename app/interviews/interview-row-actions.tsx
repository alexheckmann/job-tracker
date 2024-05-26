import {Row} from "@tanstack/react-table";
import {useDeleteInterview} from "@/app/data/use-delete-data";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Interview} from "@/lib/models/interview";
import InterviewEditDialogContent from "@/components/navbar/interview-edit-dialog-content";
import {DeleteIcon, EditIcon, LoadingIcon, OptionsIcon} from "@/components/icons";

export function InterviewRowActions({row}: { row: Row<Interview> }) {
    const interview = row.original

    const {mutateData: mutateJobs, isPending: isDeletingJob} = useDeleteInterview(interview);

    return (
        <DropdownMenu>
            <Dialog>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled={isDeletingJob}>
                        {isDeletingJob ?
                            <>
                                <span className="sr-only">Deleting entry</span>
                                <LoadingIcon/>
                            </>
                            :
                            <>
                                <span className="sr-only">Open menu</span>
                                <OptionsIcon className="text-muted-foreground"/>
                            </>
                        }
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    {/* TODO implement edit dialog */}
                    <DropdownMenuItem className={"cursor-pointer font-semibold"}>
                        <DialogTrigger className={"flex flex-row gap-2 w-full items-center"}>
                            <EditIcon/>
                            Edit
                        </DialogTrigger>
                    </DropdownMenuItem>

                    <DropdownMenuItem className={"gap-2 cursor-pointer text-destructive font-semibold"}
                                      onClick={() => mutateJobs()}>
                        <DeleteIcon/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
                <InterviewEditDialogContent interview={interview}/>
            </Dialog>
        </DropdownMenu>
    )
}
