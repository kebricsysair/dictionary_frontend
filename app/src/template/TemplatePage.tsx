import {NavigationComponent} from "./NavigationComponent";
import {Outlet, useNavigate} from "react-router";
import {FooterComponent} from "./FooterComponent";
import {useEffect} from "react";
import Paths from "../Paths";


export function TemplatePage () {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(Paths.USERS);
    }, [navigate]);

    return(
        <div>
            <NavigationComponent />
            <Outlet />
            <FooterComponent />
        </div>
    )
}