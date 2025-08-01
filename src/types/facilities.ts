import { Role } from "./roles";

export type Facility = {
  id?: number;
  facilityName?: string;
  name?: string;
  organizationId?: number;
  customerId?: number;
  facilityType?: string;
  npiNumber?: string;
  address?: string;
  timezone?: string;
  phone?: string;
  email?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  organizationName?: string;
  assignedRoles?: Role[]; // Array of roles assigned to this facility
  roles?: Role[]; // Array of roles assigned to this facility
  // Optional derived fields
  code?: string;          // If needed from elsewhere
  status?: string;        // Can be derived from isActive
  users?: number;         // Optional if coming from other API
  initials?: string;      // Can be derived for UI
  integrations?: string[]; // Populated based on enabled integrations

  // Integration flags (from API)
  goLiveEnabled?: boolean;
  pointClickCareEnabled?: boolean;
  matrixCareEnabled?: boolean;
  epicEnabled?: boolean;
  cernerEnabled?: boolean;
  mediTechEnabled?: boolean;
  mds_pdpmEnabled?: boolean;
  therapyCaseManagementEnabled?: boolean;
  appointmentSchedulingEnabled?: boolean;
  prePostTherapySupportEnabled?: boolean;
  activeNotesEnabled?: boolean;
  patientPortalAccessEnabled?: boolean;
};
