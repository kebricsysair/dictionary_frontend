import {UserDTO} from "../models/interface-models";

export class FilterUtil {
    static getPostCode(radioValue: string): number {
        switch (radioValue) {
            case "MB":
                return 2000;
            case "LJ":
                return 1000;
            case "HR":
                return 10431;
        }
        return 0;
    }

    static setFilterValue(location: string): string {
        switch (location) {
            case "MB":
                return "Maribor";
            case "LJ":
                return "Ljubljana";
            case "HR":
                return "Hrvaška";
        }
        return "";
    }

    static refactorUsers(users: UserDTO [], name: string, surname: string, department: string): UserDTO [] {
        const temp: UserDTO [] = users.filter(user => {
            const tempPriority = user.priority ?? 0;
            if (tempPriority > 0) {
                if(user.name !== name && name !== "")
                    return;

                else if (user.surname !== surname && surname !== "")
                    return;

                else if(user.department !== department && department !== "")
                    return;
            }
            return user;
        })
        return temp;
    }
}