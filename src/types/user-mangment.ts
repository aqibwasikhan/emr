// types/user.ts or wherever your types are stored
import { UserStatus } from "@/enums/users";
import { Facility } from "./facilities";
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/components/ui/badge'; 

type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

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
        variant?: BadgeVariant;
    }[];
    organization: {
        id: number;
        name: string;
    };
    // status: UserStatus;
    status: string;
};
// Full user detail for sheet view
export type UserDetail = User & {
    phone?: string;
    isAuthenticatorMfa?: boolean;
    employmentType: {
        id: number;
        name: string;
    };
    facilities: Facility[]; // replaces count
    photoUrl?: string;
};