'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import { ScrollLayoutWrapper } from '@/components/shared/infinite-scroll-container';
import { PencilIcon } from '@/icons';
import { Role } from '@/types/roles';
import { IconPlus } from '@tabler/icons-react';
import { ActionDropdown } from '@/components/shared/action-dropdown';
import { getRoles } from '@/app/actions/roles';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function RolesListing() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchRoles = async () => {
    try {
      const res = await getRoles({ page: 1, limit: 200, search });
      console.log('Fetched roles:', res);
      setRoles(res || []);
    } catch (error) {
      console.error('Failed to load roles:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRoles();
  }, [search]);

  if (loading) {
    return (
      <div className='p-4'>
        <div className="grid gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-accent rounded-md p-4 animate-pulse space-y-4">
              <div className="h-4 w-32 bg-gray-300 rounded" />
              <div className="h-4 w-full bg-gray-300 rounded" />
              <div className="h-4 w-[80%] bg-gray-300 rounded" />
              <div className="h-4 w-[90%] bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!roles.length) {
    return (
      <div className='p-4 text-center text-muted-foreground'>
        No roles found.
      </div>
    );
  }

  return (
    <div className='h-full relative'>
      <ScrollLayoutWrapper>
        <div className='grid grid-cols-1 gap-6'>
          {roles?.map((roleBlock) => (
            <Card key={roleBlock.id} className='bg-accent py-2 border-none'>
              <CardContent className="p-2">
                <div className='flex items-start justify-between px-2'>
                  <h3 className="text-sm font-semibold text-secondary mb-4">{roleBlock.name}</h3>
                  <ActionDropdown
                    actions={[
                      {
                        label: 'Edit Role',
                        href: `/roles/add?roleId=${roleBlock.id}`,
                        icon: <PencilIcon className='w-4 h-4 cursor-pointer text-foreground' />
                      },
                      { separator: true },
                      {
                        label: 'Add New Sub Role',
                        href: `/roles/sub/add/${roleBlock.id}`,
                        icon: <IconPlus className='w-4 h-4 cursor-pointer text-foreground' />
                      }
                    ]}
                  />

                </div>
                <Table className='bg-background'>
                  <TableHeader>
                    <TableRow className='border-[var(--pri-dark-5)]'>
                      <TableHead className=' pl-4 w-[250px]'>Sub Role Title</TableHead>
                      <TableHead className='w-[200px] lg:w-[300px]'>Description</TableHead>
                      <TableHead className='w-[150px]'>Scope</TableHead>
                      <TableHead className=''>Created On</TableHead>
                      <TableHead className=''>Created By</TableHead>
                      <TableHead className="pr-4  text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roleBlock.subRoles?.map((sub) => (
                      <TableRow key={sub.id} className='border-[var(--pri-grey-4)] '>
                        <TableCell className="font-semibold pl-4 hover:underline">
                          <Link href={`/roles/sub/add/${roleBlock.id}?roleId=${sub.id}`}>     {sub.name} </Link>

                        </TableCell>
                        <TableCell className="text-muted-foreground flex flex-wrap w-[200px] lg:w-[300px] whitespace-break-spaces text-balance">{sub.description}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline_pending" className='border-none rounded'>
                              {sub.scope}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(sub.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric',
                          })}
                        </TableCell>
                        <TableCell>{sub.createdBy}</TableCell>
                        <TableCell className="pr-4">
                          <div className="flex justify-center gap-2">
                            <Link href={`/roles/sub/add/${roleBlock.id}?roleId=${sub.id}`}>
                              <PencilIcon className="w-4 h-4 cursor-pointer text-[var(--pri-grey-2)]" />
                            </Link>
                            {/* <Trash2 className="w-4 h-4 cursor-pointer text-[var(--pri-grey-2)]" /> */}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollLayoutWrapper>
    </div>
  );
}
