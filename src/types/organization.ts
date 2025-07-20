export type Organization = {
  id: number;
  name: string;
  description: string;
  initials: string;           // e.g. "AR" (computed from name)
  address: string;            // e.g. "1901 Thornridge Cir. Shiloh, Hawaii"
  since: string;              // e.g. "Aug 23, 2015" (formatted date string)
  status: 'Active' | 'Inactive';
  facilities: number;         // e.g. 3
  createdAt: string;          // ISO date string (for sorting/filtering)
  updatedAt: string;          // ISO date string (for audit)
  code: string;              // <-- Add this
  type: string;
  npiNumber: string;
  email: string;
  phone: string;
  isActive:boolean;
  facilityCount:number;
  
};