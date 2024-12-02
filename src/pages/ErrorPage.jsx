import PageContent from "../components/PageContent.jsx";
import {useRouteError} from "react-router-dom";
import MainNavigation from "../components/MainNavigation.jsx";

export default function ErrorPage() {
    const error = useRouteError();

    let title = "An error occurred!";
    let message = "Something went wrong";

    if(error.status === 500) {
        message = JSON.parse(error.data).message;
    }

    if(error.status === 404) {
        title = "Not found!";
        message = "Couldn't find resource or page";
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    );
}
