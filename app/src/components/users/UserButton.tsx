import {UserDTO} from "../../models/interface-models";
import {Link} from "react-router-dom";


export function UserButton({user}: {user: UserDTO}) {
    return (
        <Link
            to="#"
            className="w-full hidden md:flex bg-gray-50 h-20 px-10 rounded-[13px] my-1 hover:bg-blue-50 duration-500"
        >
            <div
                className="text-3xl self-center pr-10"
            >
                {user.number ?? "/"}
            </div>
            <div className="border-r border-1 border-gray-200"/>
            <div
                className="self-center px-10 text-2xl tracking-wider"
            >
                {user.name + " " + user.surname}
                <span className="text-sm tracking-widest self-center">
                    , {user.priority ? user.jobTitle : user.department}
                </span>
            </div>
            <div className="flex-grow flex justify-end self-center text-xl">
                <span className="mr-6">
                    {user.mobilePhone ?? null}
                </span>
                 {user.businessPhone ?? null}
            </div>
        </Link>
    )
}