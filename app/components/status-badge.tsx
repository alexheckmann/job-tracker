import {ApplicationStatus} from "@/lib/db/schema";
import {Badge} from "@/components/ui/badge";

interface StatusBadgeProps {
    status: typeof ApplicationStatus["_type"][number]
}

export default function StatusBadge({status}: StatusBadgeProps) {

    let statusColor;
    switch (status) {
        case "Saved":
            statusColor = "bg-blue-100 text-blue-800";
            break;
        case "Applied":
            statusColor = "bg-yellow-100 text-yellow-800";
            break;
        case "Interview":
            statusColor = "bg-green-100 text-green-800";
            break;
        case "Declined":
            statusColor = "bg-red-100 text-red-800";
            break;
        default:
            statusColor = "bg-gray-100 text-gray-800";
    }
    // statusColor as switch statement
    // switch (status) {
    //     case "Saved":


    return (
        <Badge className={statusColor}>{status}</Badge>
    )

}
