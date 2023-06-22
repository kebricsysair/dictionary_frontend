export interface UserDTO {
    id?: number,
    name?: string,
    surname?: string,
    email?: string,
    businessPhone?: string,
    jobTitle?: string,
    mobilePhone?: string,
    number?: number,
    postCode?: number,
    priority?: number,
    department?: string
}

export interface DepartmentDTO {
    name: string
}