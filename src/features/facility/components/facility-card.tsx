import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OrgIcon, PencilIcon } from '@/icons';
import { Facility } from '@/types/facilities';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FacilityCard({ facility, className }: { facility: Facility, className?: string }) {
  return (
    <Card className={cn("rounded-2xl flex flex-col gap-0 py-4 h-full hover-scale-card ",
      className
    )}>
      <CardHeader className="flex items-start gap-4">
        <div className="flex items-center justify-center bg-accent rounded-full size-10 text-sm font-medium text-muted-foreground">
          <OrgIcon className="h-6 w-6 text-secondary" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-sm 2xl:text-base">{facility.facilityName}</CardTitle>
          <CardDescription className="text-xs 2xl:text-sm">{facility.npiNumber || 'N/A'}</CardDescription>
        </div>
        <CardAction>
          <Badge variant={facility.goLiveEnabled ? 'outline_completed' : 'outline_inactive'} className=" text-xs">
            {facility.goLiveEnabled ? 'Active' : 'Draft'}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="mt-2 space-y-1">
        <div className="font-semibold text-xs">{facility.address}</div>
        <div className="text-xs">Users: <span className="font-semibold">{facility.users || 0}</span></div>

      </CardContent>

      <div className="flex justify-between mt-3 px-6">
        <div className="flex gap-1 flex-wrap">
          {facility.integrations?.map((int: any, i) => (
            <Badge key={i} variant="outline_pending" className="border-none text-xs"><Check /> {int.value}</Badge>
          ))}
        </div>
        <Link href={`/facility/edit/${facility.id}`} className='cursor-pointer'>
          <PencilIcon className="h-5 w-5 text-primary hover:text-muted" />
        </Link>
      </div>
    </Card>
  );
}
