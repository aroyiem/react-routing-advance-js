import MainNavigation from "../components/MainNavigation.jsx";
import {Outlet, useNavigation} from "react-router-dom";

export default function RootPage() {

    const navigation = useNavigation();

    return (
        <>
            <MainNavigation />
            <main>
                {/*{navigation.state === 'loading' && <p>Loading...</p>}*/}
                <Outlet />
            </main>
        </>
    );
}
