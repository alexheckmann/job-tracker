import {GoogleLoginButton} from "@/components/navbar/google-login-button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {CardContainer} from "@/app/notes/card-container";
import Logo from "@/components/logo";

const loginPageTitle = "Let's get started"
const loginPageDescription = "Join Pegasus, where you can maintain an overview of your job search."

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center p-8 h-full">
            <CardContainer className={"w-[400px]"}>
                <Card className={"w-full"}>
                    <CardHeader className={"flex items-center justify-center"}>
                        <CardTitle className={"flex flex-row flex-wrap flex-grow align-middle gap-2"}>
                            <Logo className={"w-6 h-6"}/>
                            {loginPageTitle}
                        </CardTitle>
                        <CardDescription className={"inline-flex gap-2 items-center text-center pt-6 max-w-[250px]"}>
                            {loginPageDescription}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <GoogleLoginButton/>
                    </CardContent>
                </Card>
            </CardContainer>
        </div>
    )
}
