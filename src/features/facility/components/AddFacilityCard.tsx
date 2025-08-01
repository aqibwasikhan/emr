'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { Card } from '@/components/ui/card';
import { Check, Loader2, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { addFacility } from '@/app/actions/facility';
import { PencilIcon } from '@/icons';
import { Facility } from '@/types/facilities';

export function AddFacilityCard({ onAddSuccess, organizationId }: { onAddSuccess?: (facility: Facility) => void, organizationId: number }) {
    const [facilityName, setFacilityName] = useState('');
    const [isPending, startTransition] = useTransition();
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleAdd = () => {
        if (!facilityName.trim()) {
            toast.error('Facility name is required');
            return;
        }

        startTransition(async () => {
            try {
                const result = await addFacility({
                    facilityName,
                    organizationId,
                });
                if (!result.success) {

                    toast.error(result?.errors.facilityName ? result?.errors.facilityName : result.message || 'Failed to update organization');
                    return;
                }

                toast.success(result.message || 'Facility created successfully');
                setFacilityName('');
                setIsEditing(false);
                // onAddSuccess?.();
                onAddSuccess?.(result.facility); // 👈 return the new facility object
            } catch (error: any) {
                toast.error(error.message || 'Failed to add facility');
            }
        });
    };

    // Focus input when editing mode is enabled
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    return (
        <Card onClick={() => setIsEditing(true)} className="h-full rounded-2xl border-dashed border-2 border-primary bg-[var(--primary-5)] p-4 relative gap-1 cursor-pointer">
            <div className="flex items-center gap-2 text-primary font-semibold">
                <div className="flex items-center justify-center bg-[linear-gradient(270deg,_rgba(89,148,0,0)_0%,_rgba(89,148,0,0.1)_50%)] rounded-full size-10 text-sm font-medium text-primary cursor-pointer">
                    <Plus />
                </div>
                <div className='flex items-center justify-center relative w-full'>

                    <Input
                        ref={inputRef}
                        disabled={!isEditing || isPending}
                        value={facilityName}
                        onChange={(e) => setFacilityName(e.target.value)}
                        placeholder="Add New Facility"
                        className="text-sm border-b border-t-0 border-r-0 border-l-0 border-b-primary text-primary focus-visible:border-t-0 focus-visible:border-b focus-visible:border-b-primary focus-visible:ring-ring/0 placeholder:text-primary"
                    />

                    <div className="absolute top-2 right-2">
                        {isPending ? (
                            <Loader2 className="animate-spin text-primary" />
                        ) : facilityName.trim() ? (
                            <Check className="text-primary cursor-pointer" onClick={handleAdd} />
                        ) : (
                            <PencilIcon
                                className="text-primary cursor-pointer"
                                onClick={() => setIsEditing(true)}
                            />
                        )}
                    </div>

                </div>
            </div>

            <div>
                <div className="mt-2 text-sm bg-[linear-gradient(270deg,_rgba(89,148,0,0)_0%,_rgba(89,148,0,0.1)_50%)] w-10/12 h-4 rounded-full"> </div>
                <div className="mt-2 text-sm bg-[linear-gradient(270deg,_rgba(89,148,0,0)_0%,_rgba(89,148,0,0.1)_50%)] w-1/3 h-4 rounded-full"> </div>
                <div className="flex mt-2 gap-1">
                    {[...Array(2)].map((_, idx) => (
                        <div key={idx} className="flex items-center justify-center text-sm bg-[linear-gradient(270deg,_rgba(89,148,0,0)_0%,_rgba(89,148,0,0.1)_50%)] w-1/5 h-7 rounded-full">
                            <div className="bg-[linear-gradient(270deg,_rgba(89,148,0,0)_0%,_rgba(89,148,0,0.1)_50%)] w-1/5 h-3 rounded-full"> </div>
                            <div className="bg-[linear-gradient(270deg,_rgba(89,148,0,0)_0%,_rgba(89,148,0,0.1)_50%)] w-1/2 h-3 rounded-full"> </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
