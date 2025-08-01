import { searchParamsCache } from '@/lib/searchparams';
import { columns } from './components/tables/columns';
import { LogsTable } from './components/tables';
import { User } from '@/types/user-mangment';
import { getAllUser } from '@/app/actions/user-management';
import { AuditLog } from '@/types/audit-log';

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    user: {
      id: 'u1',
      firstName: 'Laura',
      lastName: 'James',
      image: '/avatars/laura.png'
    },
    date: '2025-06-01T12:00:00Z',
    role: {
      id: 1,
      name: 'Clinician',
      variant: 'pink'
    },
    activity: 'Edited',
    description: 'Modified Progress Note #1015.',
    facility: 'Acadia Center for Nursing and Rehab',
    platform: 'EMR Web App',
    module: 'Clinical Documentation'
  },
  {
    id: '2',
    user: {
      id: 'u2',
      firstName: 'John',
      lastName: 'Smith',
      image: '/avatars/john.png'
    },
    date: '2025-06-02T12:05:00Z',
    role: {
      id: 2,
      name: 'Physician',
      variant: 'green'
    },
    activity: 'Logged In',
    description: 'Logged into the ACPlus EMR system.',
    facility: 'Country Village Care',
    platform: 'EMR Web App',
    module: 'Onboarding'
  },
  {
    id: '3',
    user: {
      id: 'u3',
      firstName: 'Mary',
      lastName: 'Chen',
      image: '/avatars/mary.png'
    },
    date: '2025-06-03T12:10:00Z',
    role: {
      id: 3,
      name: 'Therapist',
      variant: 'blue'
    },
    activity: 'Viewed',
    description: 'Accessed the patient file for David Lin.',
    facility: 'Beachwood Pointe Care Center',
    platform: 'EMR iPad App',
    module: 'Therapy Documentation'
  },
  {
    id: '4',
    user: {
      id: 'u4',
      firstName: 'Ahmed',
      lastName: 'Khan',
      image: '/avatars/ahmed.png'
    },
    date: '2025-06-04T12:12:00Z',
    role: {
      id: 2,
      name: 'Physician',
      variant: 'green'
    },
    activity: 'Deleted',
    description: 'Permanently deleted User ID 214.',
    facility: 'Eagle Crest Rapid Recovery',
    platform: 'EMR Web App',
    module: 'User Management'
  },
  {
    id: '5',
    user: {
      id: 'u5',
      firstName: 'Sarah',
      lastName: 'Johnson',
      image: '/avatars/sarah.png'
    },
    date: '2025-06-05T12:18:00Z',
    role: {
      id: 4,
      name: 'Admin',
      variant: 'orange'
    },
    activity: 'Edited',
    description: 'Updated Evaluation Note #1234.',
    facility: 'La Dora Nursing and Rehabilitation',
    platform: 'EMR iPad App',
    module: 'EMR iPad App'
  },
  {
    id: '6',
    user: {
      id: 'u6',
      firstName: 'Carlos',
      lastName: 'Rivera',
      image: '/avatars/carlos.png'
    },
    date: '2025-06-06T12:30:00Z',
    role: {
      id: 2,
      name: 'Physician',
      variant: 'green'
    },
    activity: 'Created',
    description: 'Created a new user account for jessica.t@care.com.',
    facility: 'Falcon Point Post Acute',
    platform: 'EMR Web App',
    module: 'User Management'
  },
  {
    id: '7',
    user: {
      id: 'u7',
      firstName: 'Emily',
      lastName: 'Nguyen',
      image: '/avatars/emily.png'
    },
    date: '2025-06-07T12:32:00Z',
    role: {
      id: 4,
      name: 'Admin',
      variant: 'orange'
    },
    activity: 'Viewed',
    description: 'Viewed patient record for Maria Lopez.',
    facility: 'Harmony Senior Care',
    platform: 'EMR iPad App',
    module: 'Clinical Documentation'
  },
  {
    id: '8',
    user: {
      id: 'u8',
      firstName: 'Kate',
      lastName: 'Lee',
      image: '/avatars/kate.png'
    },
    date: '2025-06-08T12:47:00Z',
    role: {
      id: 5,
      name: 'Super Admin',
      variant: 'purple'
    },
    activity: 'Created',
    description: 'Created a new facility record for the facility.',
    facility: 'LA Spine Rehabilitation Center',
    platform: 'EMR Web App',
    module: 'Facility Management'
  }
];

export default async function LogsListingPage() {
  const page = Number(searchParamsCache.get('page') || 1);
  const limit = Number(searchParamsCache.get('limit') || 10);
  const search = searchParamsCache.get('search') || null;
  const organization = searchParamsCache.get('organization') || null;
  const role = searchParamsCache.get('role') || null;
  const status = searchParamsCache.get('status') || null; // ✅ NEW

  const filters = { page, limit, search, organization, role, status };
  // const response = await getAllUser(filters);

  // const users: AuditLog[] = response.data;
  const users: AuditLog[] = mockAuditLogs;

  const totalUsers = 8;
  // const totalUsers = response.total;

  return (
    <LogsTable
      data={users}
      totalItems={totalUsers}
      columns={columns}
    />
  );
}
