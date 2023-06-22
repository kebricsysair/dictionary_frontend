import {UserDTO} from "../../models/interface-models";
import {Link} from "react-router-dom";


export function UserButtonMobile ({user} : {user: UserDTO}) {
    return(
        <Link
            className="flex flex-wrap md:hidden my-2 bg-gray-50 rounded-[10px]"
            to="#"
        >
            <div className="flex flex-wrap justify-between w-full px-4 sm:px-6">
                <div className="text-3xl mr-5 py-2">
                    {user.number}
                </div>
                <div className="text-2xl py-2">
                    {user.name + " " + user.surname + ", "}
                    <span className="text-sm">
                        {(user.priority ? user.jobTitle : user.department)}
                    </span>
                </div>
            </div>
            <div className="py-2 px-4 sm:px-6 text-lg">
                {user.mobilePhone}
            </div>
            <div className="py-2 px-4 sm:px-6 text-lg">
                {user.businessPhone}
            </div>
        </Link>
    )
}