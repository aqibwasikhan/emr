'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { OrgIcon } from '@/icons';
import { Facility } from '@/types/facilities';
import { AssignRolesSheet } from './assign-roles-sheet';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Role } from '@/types/roles';

interface Props {
    facility: Facility;
    onRolesUpdate: (facilityId: number | undefined, roles: Role[]) => void;
    baseRoles?: Role[];
}

export function AssignedFacilityCard({ facility, onRolesUpdate, baseRoles }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Card className="rounded-2xl flex flex-col gap-0 py-4 h-full">
            <CardHeader className="flex items-start gap-4">
                <div className="flex items-center justify-center bg-accent rounded-full size-14 text-sm font-medium text-muted-foreground">
                    <OrgIcon className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1 flex justify-between gap-1">
                    <div>
                        <CardTitle className="text-sm 2xl:text-base">{facility.facilityName}</CardTitle>
                        <CardDescription className="text-xs 2xl:text-sm">{facility.npiNumber || 'N/A'}</CardDescription>
                        <div className="flex gap-1 flex-wrap mt-3">
                            {facility.assignedRoles?.map((role) => (
                                <Badge key={role.id} variant="green" className="text-xs rounded">
                                    {role.name}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <Button
                        variant="link"
                        size="md"
                        className="mt-2 p-0"
                        onClick={() => setOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Assign Roles
                    </Button>
                </div>
            </CardHeader>

            <AssignRolesSheet
                baseRoles={baseRoles}
                open={open}
                onOpenChange={setOpen}
                selectedRoles={facility.assignedRoles || []}
                onConfirm={(newRoles) => onRolesUpdate(facility.id, newRoles)}
            />
        </Card>
    );
}
