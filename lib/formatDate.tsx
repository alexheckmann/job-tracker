import {differenceInDays, format, formatDistanceToNowStrict, isToday, isYesterday} from "date-fns";

export function formatDate(date: Date): any {
    const now = new Date();
    const diffInDays = differenceInDays(now, date);

    if (diffInDays < 7) {
        if (isToday(date)) {
            return (
                <div className={"flex flex-row items-center gap-1"}>
                    <span className={"text-primary text-xl select-none"}>•</span>
                    <span className={""}>Today</span>
                </div>
            );
        } else if (isYesterday(date)) {
            return (
                <span>
                    Yesterday
                </span>
            );
        } else {
            return <span>{formatDistanceToNowStrict(date, {addSuffix: true})}</span>;
        }
    } else {
        return <span>{format(date, 'dd/MM/yy')}</span>;
    }
}
