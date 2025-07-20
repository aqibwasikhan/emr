export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  employeeId: string;
  selectedOrganization: any;
  selectedFacility: any;
  lastLoginAt: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
  imageUrl?:string;
}
