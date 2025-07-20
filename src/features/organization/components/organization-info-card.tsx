import { CardTitle, CardDescription } from '@/components/ui/card';
import { ExpandableCard } from '@/components/ui/ExpandableCard';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/format';
import { Organization } from '@/types/organization';
import { OrgIcon } from '@/icons';

export function OrganizationInfoCard({ org }: { org: Organization }) {
  return (
    <ExpandableCard editLinkHref={`/organization/edit/${org?.id}`}>
      <div className="flex transition-all duration-400 items-start gap-4 w-full">
        <div className="flex items-center justify-center bg-accent rounded-full size-12 text-lg font-medium text-primary transition-all duration-400 group-hover:size-14 group-hover:text-xl">
                  <OrgIcon className="h-6 w-6 text-secondary" />
        </div>
        <div className="flex-1 space-y-1">
          <CardTitle className="text-sm 2xl:text-base text-white transition-all duration-400 group-hover:text-base 2xl:group-hover:text-lg">
            {org.name}
          </CardTitle>
          <CardDescription className="text-xs xl:text-sm text-white transition-all duration-400 group-hover:text-sm 2xl:group-hover:text-base flex gap-2 items-center">
            {org.code}       <Separator orientation="vertical" className='!h-4 bg-muted-foreground' />
            {org.address}
          </CardDescription>

          <div className="flex gap-4 flex-wrap text-white text-xs transition-all duration-400 mt-4 opacity-0 group-hover:opacity-100 sr-only  group-hover:mt-4 group-hover:not-sr-only">
            {[
              { label: 'NPI', value: org.npiNumber },
              { label: 'Since', value: formatDate(org.createdAt) },
              { label: 'NO of Facility', value: org.facilityCount || '0' },
              { label: 'External Facility', value: org.facilityCount || '0' },
              { label: 'Internal Facility', value: org.facilityCount || '0' },
              { label: 'Total Users', value: '0' },
            ].map((item, idx) => (
              <div key={idx} className="flex  flex-col gap-1">
                <span className="text-muted text-sm">{item.label}</span>
                <span className="font-semibold text-base">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ExpandableCard>
  );
}
