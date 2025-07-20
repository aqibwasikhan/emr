import { searchParamsCache } from '@/lib/searchparams';
import { columns } from './components/user-tables/columns';
import { UserTable } from './components/user-tables';
import { User } from '@/types/user-mangment';
import { getAllUser } from '@/app/actions/user-management';

export default async function UserListingPage() {
  const page = Number(searchParamsCache.get('page') || 1);
  const limit = Number(searchParamsCache.get('limit') || 10);
  const search = searchParamsCache.get('search') || null;
  const organization = searchParamsCache.get('organization') || null;
  const role = searchParamsCache.get('role') || null;
  const status = searchParamsCache.get('status') || null; // ✅ NEW

  const filters = { page, limit, search, organization, role, status };
  const response = await getAllUser(filters);

  const users: User[] = response.data;
  const totalUsers = response.total;

  return (
    <UserTable
      data={users}
      totalItems={totalUsers}
      columns={columns}
    />
  );
}
