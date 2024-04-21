import {ApplicationStatus} from "@/lib/models/job";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";

interface StatusBadgeProps {
    status: typeof ApplicationStatus["_type"][number],
    children?: any,
    className?: string
}

export default function StatusBadge({status, children, className}: StatusBadgeProps) {

    let statusColor;
    switch (status) {
        case "Saved":
            statusColor = "bg-gray-100 text-gray-800 hover:bg-gray-300 hover:text-gray-900";
            break;
        case "Applied":
            statusColor = "bg-blue-100 text-blue-800 hover:bg-blue-300 hover:text-blue-900";
            break;
        case "Interviewed":
            statusColor = "bg-yellow-100 text-yellow-800 hover:bg-yellow-300 hover:text-yellow-900";
            break;
        case "Declined":
            statusColor = "bg-red-100 text-red-800 hover:bg-red-300 hover:text-red-900";
            break;
        case "Offered":
            statusColor = "bg-green-100 text-green-800 hover:bg-green-300 hover:text-green-900";
            break;
        default:
            statusColor = "bg-yellow-100 text-yellow-800 hover:bg-yellow-300 hover:text-yellow-900";
    }

    return (
        <Badge className={cn(statusColor, className, "justify-between")}>
            {status}
            {children}
        </Badge>
    )

}
