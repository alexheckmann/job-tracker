import {DataTable, FilterColumnOption} from "@/components/data-table";
import {contactColumns} from "@/app/data/contact-columns";
import {CardContent} from "@/components/ui/card";
import {useContactData, useContactEntriesStore} from "@/app/data/use-get-data";
import {useEffect} from "react";

const filterColumnOptions: FilterColumnOption[] = [
    {
        name: "company",
        type: "input",
        label: "Search for a company..."
    }
]

export default function ContactTable() {

    const {
        data: fetchedContactData,
        isLoading: isLoadingContactData,
        isFetched: isContactDataFetched
    } = useContactData()
    const {data: contactData, setData: setContactData} = useContactEntriesStore()

    useEffect(() => {
        if (isContactDataFetched) {
            setContactData(fetchedContactData!)
        }
    }, [isContactDataFetched, fetchedContactData])

    return (
        <CardContent className={"h-[70dvh] p-5 pt-3 md:p-6"}>
            <DataTable className={"h-[60dvh] overflow-auto"} data={contactData} isLoading={isLoadingContactData}
                       columns={contactColumns} filterColumnOptions={filterColumnOptions}/>
        </CardContent>
    )
}
