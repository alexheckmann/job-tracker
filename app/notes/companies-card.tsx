import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useEffect, useState} from "react";
import {InfoHover} from "@/components/info-hover";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {useSession} from "next-auth/react";
import {cn} from "@/lib/utils";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {getEmptyArray} from "@/lib/get-empty-array";
import {Badge} from "@/components/ui/badge";
import {Skeleton} from "@/components/ui/skeleton";
import {CompanyEntry} from "@/app/notes/company-entry";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {FormInput} from "@/components/form/form-input";
import {FormSwitch} from "@/components/form/form-switch";
import {SubmitButton} from "@/components/submit-button";
import {toast} from "@/components/ui/use-toast";
import {BookmarkedCompany} from "@/lib/models/bookmarked-company";
import {useBookmarkedCompaniesData} from "@/app/data/use-get-data";
import {DeleteResponse} from "@/lib/models/delete-response";
import {useRemoveCompany} from "@/app/notes/use-remove-company";
import {getCompanyLocations} from "@/app/notes/get-company-locations";
import {getFilteredCompanies} from "@/app/notes/get-filtered-companies";
import {useBookmarkedCompanyForm} from "@/app/notes/use-bookmarked-company-form";
import {useAddCompany} from "@/app/notes/use-add-company";

const companiesCardInfoText = "Save your keywords exactly how you use them on job portals. Some job portals use quotation marks to search for exact phrases."

export function CompaniesCard() {

    const {data: session, status} = useSession()
    const isLoadingSession: boolean = status !== "authenticated"
    const {
        data: fetchedBookmarkedCompanies,
        isLoading: isLoadingBookmarkedCompanies,
        isFetched: isBookmarkedCompaniesDataFetched
    } = useBookmarkedCompaniesData()

    const [locations, setLocations] = useState<string[]>([])

    const [displayedCompanies, setDisplayedCompanies] = useState<BookmarkedCompany[]>([])
    const [allCompanies, setAllCompanies] = useState<BookmarkedCompany[]>([])

    const [isFormHidden, setIsFormHidden] = useState<boolean>(true)

    useEffect(() => {
        if (isBookmarkedCompaniesDataFetched) {
            const locations: string[] = getCompanyLocations(displayedCompanies, session?.user?.locations ?? []);
            setLocations(locations)

            const companiesToDisplay = getFilteredCompanies(fetchedBookmarkedCompanies!, form.getValues("location") ?? locations[0])
            setDisplayedCompanies(companiesToDisplay)
            setAllCompanies(fetchedBookmarkedCompanies!)
        }
    }, [isBookmarkedCompaniesDataFetched, fetchedBookmarkedCompanies, session?.user?.locations]);

    const form = useBookmarkedCompanyForm(locations[0] ?? "Worldwide")

    function onAddSuccessCallback(data: BookmarkedCompany) {
        const updatedCompaniesToBeDisplayed = getFilteredCompanies([data, ...displayedCompanies], data.location)
        setDisplayedCompanies(updatedCompaniesToBeDisplayed)
        form.reset({...form.getValues(), companyName: "", isFavorite: false})
        toast({
            title: "Company added",
            description: `${data.companyName} was added to your notes.`,
            variant: "default"
        })
    }

    function onAddErrorCallback() {
        toast({
            title: "Error",
            description: "An error occurred while adding the company.",
            variant: "destructive"
        })
    }

    const {
        mutate: addCompany,
        isPending: isAdding
    } = useAddCompany("company", ["companies"], onAddSuccessCallback, onAddErrorCallback)

    function onRemoveSuccessCallback(data: DeleteResponse) {
        const updatedCompaniesToBeDisplayed = displayedCompanies.filter((entry: BookmarkedCompany) => entry._id !== data.deletedId)
        setDisplayedCompanies([...updatedCompaniesToBeDisplayed])
        toast({
            title: "Company removed",
            description: `The company was removed from your notes.`,
            variant: "default"
        })
    }

    function onRemoveErrorCallback() {
        toast({
            title: "Error",
            description: "An error occurred while removing the company.",
            variant: "destructive"
        })
    }

    const {
        mutate: removeCompany,
        isPending: isPendingRemoval
    } = useRemoveCompany("company", ["companies"], onRemoveSuccessCallback, onRemoveErrorCallback)


    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Companies
                </CardTitle>
                <CardDescription className={"inline-flex gap-2 align-middle"}>
                    A list of target companies you can check.
                    <InfoHover infoText={companiesCardInfoText}/>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(async (data: BookmarkedCompany) => {
                        // only add company if there is not already a company with the same name and location
                        if (displayedCompanies.some((entry: BookmarkedCompany) => entry.companyName === data.companyName && entry.location === data.location)) {
                            form.reset({...form.getValues(), companyName: "", isFavorite: false})
                            return
                        }
                        addCompany(data)
                    })}>
                        <FormField
                            control={form.control}
                            name="location"
                            defaultValue={locations[0]}
                            render={({field}) => (
                                <div className={cn("flex flex-col gap-2 mb-6")}>
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <Select disabled={isLoadingSession}
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    const companiesToBeDisplayed = getFilteredCompanies(allCompanies, value)
                                                    setDisplayedCompanies([...companiesToBeDisplayed])
                                                    field.onChange(value)
                                                }}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue/>
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent align={"center"}>
                                                <SelectGroup>
                                                    {locations.map((item, index) =>
                                                        <SelectItem key={index} value={item}>{item}</SelectItem>)}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                </div>
                            )}
                        />
                        <div
                            className={"flex flex-row flex-wrap gap-2 items-start h-[240px] content-start overflow-y-auto"}>
                            {isLoadingBookmarkedCompanies ?
                                getEmptyArray(12).map((_, i) => (
                                    <Badge key={i} className={`w-[90px]`} variant={"outline"}>
                                        <Skeleton className={"w-full h-4"}/>
                                    </Badge>
                                )) :
                                displayedCompanies.length > 0 ?
                                    displayedCompanies.map((entry: BookmarkedCompany) => (
                                        <CompanyEntry key={entry._id} entry={entry}
                                                      removeEntryFunction={removeCompany}
                                                      isPendingRemoval={isPendingRemoval}/>
                                    )) :
                                    <span className={"pl-2 font-semibold text-sm"}>
                                        Add companies to your notes.
                                    </span>
                            }
                        </div>
                        {isFormHidden ?
                            <Button variant={"ghost"} className={"w-fit gap-2 mt-6"}
                                    onClick={() => setIsFormHidden(false)}
                                    disabled={isLoadingSession}>
                                <Plus className={"h-4 w-4"}/>
                                Add entry
                            </Button> :
                            <div className={"flex flex-row gap-4 items-center mt-6"}>
                                <FormField control={form.control} name="companyName" render={({field}) => (
                                    <FormInput placeholder={"Name of the company"} className={"pb-4"} required
                                               field={field}/>
                                )}/>
                                <FormField control={form.control} name="isFavorite" render={({field}) => (
                                    <FormSwitch label={"Favorite"} checked={field.value}
                                                onCheckedChange={field.onChange}/>
                                )}/>
                                <SubmitButton className={"sm:w-fit"} isPending={isAdding}
                                              normalIcon={<Plus className={"h-4 w-4"}/>}
                                              disabled={false}/>
                            </div>
                        }
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
