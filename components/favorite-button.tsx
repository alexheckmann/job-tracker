import {HTMLAttributes} from "react";
import {Job} from "@/lib/models/job";
import {useUpdateJob} from "@/app/data/use-update-data";
import {Button} from "@/components/ui/button";
import {Star} from "lucide-react";
import {LoadingIcon} from "@/components/icons";

interface FavoriteButtonProps extends HTMLAttributes<HTMLButtonElement> {
    job: Job
}

export function FavoriteButton({job}: FavoriteButtonProps) {

    const {mutateData: updateJob, isPending: isUpdatingJob} = useUpdateJob(job)

    return (
        <Button variant="ghost" className={"w-fit"} disabled={isUpdatingJob}
                onClick={() => updateJob({...job, isFavorite: !job.isFavorite})}>
            {isUpdatingJob ?
                <LoadingIcon/> :
                job.isFavorite ?
                    <Star fill={"#FFD700"} className="h-4 w-4 text-ternary"/> :
                    <Star className={"h-4 w-4 text-muted-foreground"}/>}
        </Button>
    )
}
