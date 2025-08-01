import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/components/ui/badge'; 

type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
export type SubRole = {
  id: number;
  title?:string;
  name: string;
  description: string;
    variant?: BadgeVariant;
  scope: string;
  createdAt: string;
  createdBy: string;
};

export type Role = {
  id: number;
  name: string;
  role?:string;
  subRoles?: SubRole[];
  variant?: BadgeVariant;

};
export type Permission = {
  id: number;
  name: string;
  value: string;
  isAssigned?: boolean;
};

export type Resource = {
  id: number;
  name: string;
  permissions: Permission[];
};

export type ModuleGroup = {
  id: number;
  name: string;
  resources: Resource[];
};
export type RoleDetail = {
  id: number;
  name: string;
  scope: string;
  description: string;
  modules: ModuleGroup[];
};