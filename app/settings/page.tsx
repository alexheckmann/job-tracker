import {RolesCard} from "@/app/settings/roles-card";
import {CardContainer} from "@/app/notes/card-container";
import {LocationsCard} from "@/app/settings/locations-card";

export default function SettingsPage() {
    return (
        <div className="grid items-start justify-center gap-6 rounded-lg p-2 md:p-8 grid-cols-2 xl:grid-cols-3">
            <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
                <CardContainer>
                    <RolesCard/>
                </CardContainer>
                <CardContainer>
                    <LocationsCard/>
                </CardContainer>
            </div>
        </div>
    )
}
