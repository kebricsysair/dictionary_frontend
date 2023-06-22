import React from "react";
import {Link} from "react-router-dom";
import Paths from "../Paths";
import logo from "../pictures/systemair_logo.jpg"

export function NavigationComponent() {
    return (
        <nav className="bg-white flex flex-wrap shadow-md">
            <div className="flex p-3">
                <Link
                    className="bg-red-50"
                    to={Paths.USERS}>
                    <img
                        className="w-48"
                        src={logo}
                        alt="logo" />
                </Link>
                <span className="self-center">

                </span>
            </div>
            <div className="flex justify-end bg-gray-200 w-full bg px-6">
                <Link
                    className="p-5 tracking-wider text-xl bg-transparent border-b-2 border-transparent transition ease-in-out hover:border-gray-400 duration-500"
                    to={Paths.USERS}>
                    IMENIK
                </Link>
            </div>
        </nav>
    )
}