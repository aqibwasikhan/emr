// types/user.ts or wherever your types are stored
import { UserStatus } from "@/enums/users";

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    lastLoginAt: string;
    facilities: number;
    roles: {
        id: number;
        name: string;
        baseRoleName?: string;
    }[];
    organization: {
        id: number;
        name: string;
    };
    // status: UserStatus;
    status: string;
};
