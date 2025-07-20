'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SelectFacilitiesSheet } from './select-facilities-sheet';
import { Facility } from '@/types/facilities'; // ✅ Use shared type
import { AssignedFacilityCard } from './assigned-facility-card';
import { Grid, GridItem } from '@/components/ui/custom/grid';
import Image from 'next/image';
import { useUserFormStore } from '@/stores/userFormStore';
import { getAllFacilitySummary } from '@/app/actions/facility';
import { assignFacilityToUser } from '@/app/actions/user-management';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getAllLookupBaseRoles } from '@/app/actions/lookups';
import { Role } from '@/types/roles';

export default function AssignFacilityForm({ onPrevStep }: { onPrevStep: () => void }) {
  const [selectedFacilities, setSelectedFacilities] = useState<Facility[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSumbitloading, setIsSumbitloading] = useState(false);
  const { userId, clearUserId } = useUserFormStore();
  const [baseRoles, setBaseRoles] = useState<Role[]>([]);
  const router = useRouter();

  const fetchFacilities = async () => {
    try {
      const res = await getAllFacilitySummary(); // ✅ client-safe function
      setFacilities(res || []);
    } catch (error) {
      console.error('Failed to load facilities:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchBaseRoles = async () => {
    try {
      const res = await getAllLookupBaseRoles();
      console.log('Base roles loaded:', res);
      if (res?.success) {
        setBaseRoles(res.data || []);
      }
    } catch (error) {
      console.error('Error loading base roles:', error);
    }
  };
  useEffect(() => {
    fetchBaseRoles();
    fetchFacilities();
  }, []);

  async function handleAssignFacilitySubmission(selected: Facility[]) {
    const payload = {
      submission: selected.map((facility) => ({
        userId,
        facilityId: facility.id,
        assignedRoles: (facility.assignedRoles || []).map((role) => role.id),
      })),
    };
    setIsSumbitloading(true);

    console.log('Selected facility payload:', payload);
    const result = await assignFacilityToUser(payload);
    if (!result.success) {
      toast.error(result.message || 'Failed to create user');
      setIsSumbitloading(false);
      return;
    }

    // ✅ Store userId and clear form data
    clearUserId();
    router.push('/user-management');
    toast.success(result.message || 'Assigned facilities successfully');

  }

  return (
    <div className="space-y-4 px-1 pb-12">

      {selectedFacilities.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
          <Image src={'/images/no_facility.webp'} alt='X NO Facility' className='ml-2 ' width={200} height={200} />
          <p className="text-muted-foreground text-xl">No facilities has been assigned yet</p>
          <SelectFacilitiesSheet
            selected={selectedFacilities}
            onConfirm={setSelectedFacilities}
            facilities={facilities}
          />
        </div>
      ) : (
        <div className="space-y-2">
          <div className='flex items-center justify-end mb-2'>
            <SelectFacilitiesSheet
              selected={selectedFacilities}
              onConfirm={setSelectedFacilities}
              facilities={facilities}
            />
          </div>
          <div >
            <Grid className=" gap-y-4" >

              {selectedFacilities.map((f) => (
                <GridItem xs={12} key={f.id}>
                  <AssignedFacilityCard
                    baseRoles={baseRoles}
                    facility={f}
                    onRolesUpdate={(facilityId, roles) => {
                      setSelectedFacilities((prev) =>
                        prev.map((fac) =>
                          fac.id === facilityId ? { ...fac, assignedRoles: roles } : fac
                        )
                      );
                    }}
                  />
                </GridItem>
              ))}
            </Grid>
          </div>
        </div>
      )}

      <div className="page-container-footer">
        {/* <Button variant="ghost" onClick={onPrevStep} className="text-xs md:text-sm px-5!">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button> */}
        <Button
          variant="primary"
          size="lg"
          disabled={isSumbitloading || selectedFacilities.length === 0}
          className="text-xs md:text-sm px-5!"
          onClick={() => handleAssignFacilitySubmission(selectedFacilities)}
        >
          <Check />
        </Button>
      </div>
    </div>
  );
}
