import {ApplicationStatus} from "@/lib/db/schema";
import {Badge} from "@/components/ui/badge";

interface StatusBadgeProps {
    status: typeof ApplicationStatus["_type"][number]
}

export default function StatusBadge({status}: StatusBadgeProps) {

    const statusColor = status === "Saved" ? "bg-blue-100 text-blue-800" : status === "Applied" ? "bg-yellow-100 text-yellow-800" : status === "Interview" ? "bg-green-100 text-green-800" : status === "Declined" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"

    return (
        <Badge className={statusColor}>{status}</Badge>
    )

}
