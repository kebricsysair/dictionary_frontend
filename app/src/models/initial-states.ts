import {DepartmentDTO, UserDTO} from "./interface-models";

export const userInitialState: UserDTO = {
    id: 0,
    name: "",
    surname: "",
    email: "",
    businessPhone: "",
    jobTitle: "",
    mobilePhone: "",
    number: 0,
    postCode: 0,
    priority: 0,
    department: ""
}
export const suggestionsInitialstate: UserDTO [] = [];
export const usersInitialState: UserDTO [] = [];
export const departmentInitialState: string = "";
export const departmentsInitialState: string [] = [];
export const locationInitialState: string = "";
export const nameInitialState: string = "";
export const surnameInitialState: string = "";