'use client';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetClose,
    SheetFooter,
} from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Check, KeyRound, Phone } from 'lucide-react';
import { ExpandableCard } from '@/components/ui/ExpandableCard';
import { EmailIcon, OrgIcon, UserIcon } from '@/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserById } from '@/app/actions/user-management';
import { UserDetail } from '@/types/user-mangment';
import { GridSkeleton, tableSkeletonConfig } from '@/components/ui/custom/grid/grid-skeleton';
import { getInitials } from '@/lib/utils';
import { useUserFormStore } from '@/stores/userFormStore';

interface Props {
    userId: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserDetailSheet({ userId, open, onOpenChange }: Props) {
    const [user, setUser] = useState<UserDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const { clearUserData } = useUserFormStore();

    useEffect(() => {
        if (open && userId) {
            setLoading(true);
            getUserById(userId)
                .then((res: any) => {
                    if (res?.success) setUser(res.data);
                })
                .finally(() => setLoading(false));
        }
    }, [userId, open]);

    const skeletonConfig = tableSkeletonConfig({
        rows: 4,
        filledRows: 4,
        columns: [3, 3, 6],
        className: 'mt-4 border-none',
    });

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-[637px]! gap-0">
                <SheetHeader>
                    <SheetTitle>User Details</SheetTitle>
                    <SheetDescription>User account summary with assigned facilities & roles.</SheetDescription>
                </SheetHeader>
                <Separator className="mx-4" />

                <div className="px-4 pb-10 flex-1 space-y-4 overflow-auto no-scrollbar">
                    {loading ? (
                        <GridSkeleton config={skeletonConfig} />
                    ) : (
                        <div className='mt-3 space-y-4'>
                            <ExpandableCard editClick={() => clearUserData()} editLinkHref={`/user-management/edit/${userId}`} isExpanded={false}>
                                <div className="flex items-start gap-4 w-full">
                                    <div className="flex items-center justify-center bg-accent rounded-full size-12 text-lg font-medium text-primary">
                                        {getInitials(`${user?.firstName || ''} ${user?.lastName || ''}`)}

                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <CardTitle className="text-sm 2xl:text-base text-white">
                                            {user?.firstName} {user?.lastName}

                                        </CardTitle>
                                        <CardDescription className="text-xs xl:text-sm text-white flex gap-2 items-center">
                                            <Button variant="link" size="sm" className='text-white pl-0'>Reset Password</Button>
                                            <Separator orientation="vertical" className="!h-4 bg-muted-foreground" />
                                            <Button variant="link" size="sm" className='text-white'>Enforce MFA</Button>
                                        </CardDescription>
                                    </div>
                                </div>
                            </ExpandableCard>

                            {/* <div className="flex items-center justify-between border rounded-lg px-4 py-2">
                                    <span className="font-medium">Make This User Active</span>
                                    <Switch checked={user?.status === 'Active'} />
                                </div> */}

                            <Separator className='seprater-dashed bg-background' />

                            <Card className="px-1 bg-[var(--pri-grey-5)] border-none">
                                <CardHeader className="flex items-start gap-4">
                                    <CardTitle>Personal Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-1 mt-2 text-[var(--pri-grey-2)]">
                                    <div className="flex flex-wrap gap-3 justify-between text-sm text-muted-foreground">
                                        {[
                                            {
                                                label: "Organization",
                                                icon: <OrgIcon className="size-4" />,
                                                value: user?.organization?.name || "--",
                                            },
                                            {
                                                label: "Email",
                                                icon: <EmailIcon stroke="var(--pri-grey-3)" className="size-4" />,
                                                value: user?.email || "--",
                                            },
                                            {
                                                label: "Phone",
                                                icon: <Phone className="size-4" />,
                                                value: user?.phone || "N/A",
                                            },
                                            {
                                                label: "MFA",
                                                icon: <KeyRound className="size-4" />,
                                                value: user?.isAuthenticatorMfa ? "Enabled" : "Disabled",
                                            },
                                            {
                                                label: "Employee Type",
                                                icon: <UserIcon stroke="var(--pri-grey-3)" className="size-4" />,
                                                value: user?.employmentType?.name || "--",
                                            },
                                        ].map((item, index) => (
                                            <div key={index} className="flex flex-col gap-2 ">
                                                <span className="flex items-center gap-1 font-medium text-[var(--pri-grey-3)]">
                                                    {item.icon}
                                                    {item.label}
                                                </span>
                                                <span className='font-bold'>{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                            <Separator className='seprater-dashed bg-background' />

                            <div>
                                <h4 className="text-sm font-semibold mb-2">Assigned Facilities</h4>
                                <div className="space-y-3">
                                    {user?.facilities?.map((facility, i) => (
                                        <Card key={i} className="rounded-2xl flex flex-col gap-0 py-4 h-full">
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
                                                                <Badge key={role.id}  variant={role.variant || 'green'}className="text-xs rounded">
                                                                    {role.name}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <SheetFooter className="mt-6">
                    <SheetClose asChild>
                        <div className="page-container-footer rounded-bl-xl">
                            <Button
                                variant="primary"
                                size="lg"
                                className="text-xs md:text-sm px-5!"
                            >
                                <Check />
                            </Button>
                        </div>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
