import React, {ChangeEvent, Fragment, MouseEventHandler, useEffect, useState} from "react";
import {
    departmentInitialState, departmentsInitialState,
    locationInitialState,
    nameInitialState, suggestionsInitialstate,
    surnameInitialState
} from "../../models/initial-states";
import {RadioInput} from "./RadioInput";
import {FilterUtil} from "../../util/FilterUtil";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {UserDTO} from "../../models/interface-models";
import api from "../../api/api";

export function UserFilter({filterUsers, users}: { filterUsers: (department: string, name: string, surname: string, radioValue: string) => void, users: UserDTO[]}) {
    const [department, setDepartment] = useState<string>(departmentInitialState);
    const [suggestions, setSuggestions] = useState<UserDTO[]>(suggestionsInitialstate);

    const [name, setName] = useState<string>(nameInitialState);
    const [surname, setSurname] = useState<string>(surnameInitialState);
    const [location, setLocation] = useState<string>(locationInitialState);
    const [departments, setDeparments] = useState<string []>(departmentsInitialState);
    const locations: string [] = ["LJ", "MB", "HR"];

    useEffect(() => {
        const getDepartments = (): void => {
            api.get("/users/departments").then(response => {
                setDeparments(response.data)
                console.log(response.data)
            })
        }
        getDepartments();
    }, [])
    const onClickHandler = ():void => {
        filterUsers(department, name, surname, location)
    }

    const removeFilter = (): void => {
        window.location.reload();
    }

    const onChangeNameHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        const data: string = event.target.value;
        let matches: UserDTO [] = [];
        if (data.length > 0) {
            /*
                flag gi:
                g - global, searching for occurrences of the patterns throughout the input
                i - case-insensitive
             */
            matches = users.filter(user => {
                const regex = new RegExp(`${data}`, "gi");
                return user.name?.match(regex);
            })
        }
        console.log(matches);
        setSuggestions(matches);
        setName(data);
    }

    const onChangeSurnameHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        const data: string = event.target.value;
        let matches: UserDTO [] = [];
        if (data.length > 0) {
            /*
                flag gi:
                g - global, searching for occurrences of the patterns throughout the input
                i - case-insensitive
             */
            matches = users.filter(user => {
                const regex = new RegExp(`${data}`, "gi");
                return user.surname?.match(regex);
            })
        }
        console.log(matches);
        setSuggestions(matches);
        setSurname(data);
    }

    return (
        <form>
            <div className="flex flex-wrap justify-center tracking-wider p-3 md:p-12 xl:p-8 self-center">
                <div className="relative h-11 w-full mb-6">
                    <input
                        list="name-list"
                        onChange={onChangeNameHandler}
                        className="peer h-full w-full border-b border-gray-400 bg-transparent pt-4 pb-1.5 text-black outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                    />
                    <datalist
                        id="name-list">
                        {
                            suggestions.map((suggestion: UserDTO, index: number) => {
                                return(
                                    <option id="option" key={index}>
                                        {suggestion.name}
                                    </option>
                                )
                            })
                        }
                    </datalist>

                    <label
                        className="after:content[' '] text-gray-600 pointer-events-none duration-300 absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight peer-focus:after:scale-x-100 ">
                        Ime
                    </label>
                </div>
                <div className="relative h-11 w-full my-6">
                    <input
                        list="surname-list"
                        onChange={onChangeSurnameHandler}
                        className="peer h-full w-full border-b border-gray-400 bg-transparent pt-4 pb-1.5 text-black outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                    />
                    <datalist
                        className="bg-white text-red-200"
                        id="surname-list">
                        {
                            suggestions.map((suggestion: UserDTO, index: number) => {
                                return(
                                    <option
                                        className="bg-white text-red-200"
                                        key={index}>
                                        {suggestion.surname}
                                    </option>
                                )
                            })
                        }
                    </datalist>
                    <label
                        className="after:content[' '] text-gray-600 pointer-events-none absolute duration-300 left-0 -top-1.5 flex h-full w-full select-none text-[11px] leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight peer-focus:after:scale-x-100 ">
                        Priimek
                    </label>
                </div>
                <div className="w-full py-6">
                    <Listbox value={department} onChange={setDepartment}>
                        <div className="relative mt-1 z-30">
                            <Listbox.Button
                                className="relative w-full cursor-default bg-white py-3 pl-3 pr-10 border-b border-gray-400 text-left focus:outline-none">
                                <span className="block text-gray-600 truncate">{department.length > 0 ? department : "Izberite oddelek"}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-600"
                                    aria-hidden="true"
                                />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options
                                    className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {departments.map((dep, index) => (
                                        <Listbox.Option
                                            key={index}
                                            className={({active}) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                                                }`
                                            }
                                            value={dep}
                                        >
                                            {({selected}) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${
                                                            selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                    >
                                                    {dep}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                            <CheckIcon className="h-5 w-5 text-blue-500" aria-hidden="true"/>
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
                <div className="flex w-full justify-around flex-wrap mt-4 mb-6">
                    {
                        locations.map((location, index) => {
                            return (
                                <RadioInput
                                    key={index}
                                    id={location}
                                    setRadioInput={setLocation}
                                    value={FilterUtil.setFilterValue(location)}/>
                            )
                        })
                    }
                </div>
                <div className="w-full flex justify-between flex-wrap pt-6">
                    <button
                        onClick={removeFilter}
                        type="button"
                        className="bg-white hover:bg-gray-100 text-gray-600 py-2 px-8 border border-gray-300 rounded-[10px]">
                        Počisti
                    </button>
                    <button
                        type="button"
                        onClick={onClickHandler}
                        className="bg-white hover:bg-gray-100 text-gray-600 py-2 px-8 border border-gray-300 rounded-[10px]">
                        Potrdi
                    </button>
                </div>
            </div>
        </form>

    )
}
