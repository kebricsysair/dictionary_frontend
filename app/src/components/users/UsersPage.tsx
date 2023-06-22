import React, {useEffect, useState} from "react";
import {UserFilter} from "./UserFilter";
import {UserDTO} from "../../models/interface-models";
import {usersInitialState} from "../../models/initial-states";
import api from "../../api/api";
import {FilterUtil} from "../../util/FilterUtil";
import UserPagination from "./UserPagination";
import {UserButton} from "./UserButton";
import {UserButtonMobile} from "./UserButtonMobile";

export function UsersPage() {
    const [users, setUsers] = useState<UserDTO []>(usersInitialState);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postsPerPage, setPostPerPage] = useState<number>(6);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentlyShown = users.slice(firstPostIndex, lastPostIndex);

    useEffect(() => {
        const getUsers = (): void => {
            api.get("/users/").then((response) => {
                setUsers((prevState) => response.data);
            });
        }
        getUsers();
    }, [])

    const filterUsers = (department: string, name: string, surname: string, radioValue: string): void => {
        //console.log(radioValue)
        console.log(department + "   " + name + "    " + surname + "   " + radioValue)
        api.get("/users/filter", {
            params: {
                department: department,
                name: name,
                surname: surname,
                postCode: FilterUtil.getPostCode(radioValue)
            }
        }).then((response) => {
            console.log("oddelek", department, radioValue)
            if(department !== "" || name !== "" || department !== "")
                setUsers(FilterUtil.refactorUsers(response.data, name, surname, department))
            else setUsers(response.data);
        });
    }

    return (
        <div className="grid grid-cols-6 pb-16">
            <div className="col-span-6 xl:col-span-2 self-center px-10 mt-16 xl:mt-0">
                <UserFilter filterUsers={filterUsers} users={users}/>
            </div>
            <div className="bg-transparent min-h-[600px] col-span-6 xl:col-span-4 px-10 md:px-20 mt-16">
                <div className="flex flex-wrap">
                    {
                        currentlyShown.map((user, index) => {
                            return (
                                <div key={index} className="w-full">
                                    <UserButton user={user} />
                                    <UserButtonMobile user={user} />
                                </div>

                            )
                        })
                    }
                </div>
                <div className="col-span-6 justify-end flex pt-4">
                    <UserPagination currentPage={currentPage} setCurrentPage={setCurrentPage}
                                    postsPerPage={postsPerPage} totalPosts={users.length}/>
                </div>
            </div>
        </div>
    )
}