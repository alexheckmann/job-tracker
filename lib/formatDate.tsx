import {differenceInDays, format, formatDistanceToNowStrict, isToday, isYesterday} from "date-fns";

export function formatDate(date: Date): string {
    const now = new Date();
    const diffInDays = differenceInDays(now, date);

    if (diffInDays < 7) {
        if (isToday(date)) {
            return 'Today';
        } else if (isYesterday(date)) {
            return 'Yesterday';
        } else {
            return formatDistanceToNowStrict(date, {addSuffix: true});
        }
    } else {
        return format(date, 'dd/MM/yy');
    }
}
