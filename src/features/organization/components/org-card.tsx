import * as React from 'react';

import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; // Example icon, replace with your icon
import { OrgIcon, RightArrowIcon } from '@/icons';
import Link from 'next/link';
import { Organization } from '@/types/organization';
import { formatDate } from '@/lib/format';

export function OrganizationCard({ organization }: { organization: Organization }) {
  return (
    
    <Card className="h-full rounded-2xl flex flex-col gap-0 py-4  ">
      <div>
        <CardHeader className="flex items-start gap-4">
          {/* Circle Avatar Placeholder with initials */}
          <div className="flex items-center justify-center bg-accent rounded-full size-12 text-lg font-medium text-muted-foreground">
                    <OrgIcon className="h-6 w-6 text-secondary" />
          
          </div>
          <div className="flex-1">
            <CardTitle className='text-sm 2xl:text-base '>{organization.name}</CardTitle>
            <CardDescription className='text-xs 2xl:text-sm'>{organization.code}</CardDescription>
          </div>
          <CardAction>
            <Badge variant={organization.isActive ? 'outline_completed' : 'outline_inactive'} className=" text-xs ">
              {organization.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-1 mt-2 text-[var(--pri-grey-1)]">
          <div className="font-semibold text-xs 2xl:text-sm">{organization.address}</div>
          <div className="text-xs 2xl:text-sm">
            Since: <span className="font-semibold">{formatDate(organization.createdAt)}</span>
          </div>
          <div className="text-xs 2xl:text-sm ">
            Facilities: <span className="font-semibold">{organization.facilityCount || 0}</span>
          </div>
        </CardContent>
      </div>

      <div className="flex justify-end px-6 ">
        <Link href={`/organization/${organization.id}`} className='cursor-pointer'>
          <RightArrowIcon className="text-primary hover:text-muted" />
        </Link>
      </div>
    </Card>
  );
}
