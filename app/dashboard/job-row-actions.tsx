import {Row} from "@tanstack/react-table";
import {Job} from "@/lib/models/job";
import {useDeleteJob} from "@/app/data/use-delete-data";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import JobEditDialogContent from "@/components/navbar/job-edit-dialog-content";
import {DeleteIcon, EditIcon, LoadingIcon, OptionsIcon} from "@/components/icons";

export function JobRowActions({row}: { row: Row<Job> }) {
    const job = row.original

    const {mutateData: mutateJobs, isPending: isDeletingJob} = useDeleteJob(job);

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

                    <DropdownMenuItem className={"gap-2 cursor-pointer text-destructive font-semibold"}
                                      onClick={() => mutateJobs()}>
                        <DeleteIcon/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
                <JobEditDialogContent job={job}/>
            </Dialog>
        </DropdownMenu>
    )
}
