// app/organization/[id]/page.tsx
import { CustomBreadcrumbs } from '@/components/ui/custom/CustomBreadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { OrgIcon } from '@/icons';
import { OrganizationDetailClient } from './components/OrganizationDetailClient';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { getOrganizationById } from '@/app/actions/organization';
import { getFacilitiesByOrgId } from '@/app/actions/facility';
import { OrganizationInfoCard } from './components/organization-info-card';

export default async function OrganizationDetailPage({ id }: { id: string }) {
  const orgId = parseInt(id);

  const org = await getOrganizationById(orgId);
  const { facilities: initialFacilities, total: totalFacilities } = await getFacilitiesByOrgId(orgId, 1, 7);

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <div className='flex items-start flex-col gap-2'>
        <Heading title="Organization Details" />
        <CustomBreadcrumbs
          items={[
            { label: 'Organizations', href: '/organization?page=1', icon: <OrgIcon className="h-5 w-5" /> },
            { label: org.name, active: true }
          ]}
        />
      </div>

      <Separator />
      <OrganizationInfoCard org={org} />

      <Card className='flex-col h-full border-none bg-accent px-2 py-2'>
        <CardTitle className="text-sm 2xl:text-base text-secondary">Facilities {totalFacilities}</CardTitle>
        <CardContent className="relative h-full bg-background rounded-2xl">
          <OrganizationDetailClient
            org={org}
            initialFacilities={initialFacilities}
            totalFacilities={totalFacilities}
          />
        </CardContent>
      </Card>
    </div>
  );
}

