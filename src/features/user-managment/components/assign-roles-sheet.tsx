'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSubRoles } from '@/app/actions/roles';
import { Role } from '@/types/roles';
import { Separator } from '@/components/ui/separator';
import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AssignRolesSheet({
  open,
  onOpenChange,
  selectedRoles,
  onConfirm,
  baseRoles = [],
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRoles: Role[];
  onConfirm: (roles: Role[]) => void;
  baseRoles?: Role[];
}) {
  const [subRoles, setSubRoles] = useState<Role[]>([]);
  const [selected, setSelected] = useState<Role[]>(selectedRoles);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const fetchSubRoles = async (baseRoleId?: number | null, query?: string) => {
    try {
      const res = await getSubRoles({ baseRoleId: baseRoleId ?? undefined, search: query ?? '' });
      if (res?.success) {
        setSubRoles(res.data || []);
      }
    } catch (error) {
      console.error('Error loading sub roles:', error);
    }
  };

  useEffect(() => {
    if (open) {
      setSelected(selectedRoles);
      fetchSubRoles(); // initially all
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      fetchSubRoles(activeGroup, debouncedSearch);
    }
  }, [activeGroup, debouncedSearch, open]);

  const toggleRole = (role: Role) => {
    const exists = selected.some((r) => r.id === role.id);
    if (exists) {
      setSelected((prev) => prev.filter((r) => r.id !== role.id));
    } else {
      setSelected((prev) => [...prev, role]);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-[637px]! gap-3">
        <SheetHeader className="pb-1">
          <SheetTitle className='font-bold'>Assign Roles</SheetTitle>
          <SheetDescription>
            Choose the user’s role and sub-role for system access control.
          </SheetDescription>
        </SheetHeader>
        <Separator className="mx-4" />

        <div className="px-4 pb-10 flex-1">
          {/* Selected Roles Pills */}
          <div>
            <Card className="flex flex-wrap gap-2 border-none  px-3 pt-2 pb-3 min-h-[48px] shadow-[0px_0px_20px_0px_rgba(67,67,67,0.10)]">
              <CardHeader className='p-0'>

                <CardTitle className="text-xs text-muted-foreground mb-1 block">Roles</CardTitle>

              </CardHeader>
              <CardContent className='flex flex-wrap gap-2 p-0'>


                {selected.length === 0 && (
                  <span className="text-sm text-muted-foreground">No roles selected</span>
                )}

                {selected.map((role) => (
                  <Badge
                    key={role.id}
                    variant="green"
                     onClick={() => toggleRole(role)}
                    className="text-xs rounded flex items-center gap-1 pr-2"
                  >
                    {role.name}
                    <X
                      className="h-3 w-3 cursor-pointer"
                     
                    />
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Base Role Filters */}
          <div className="mt-6">
            <label className="text-sm font-bold mb-2 block">Suggestions</label>
            <div className="flex flex-wrap gap-2">
              <span className='text-sm'>Filter By</span>
              <Badge
                variant={activeGroup === null ? 'outline_inactive' : 'outline_inactive'}
                onClick={() => setActiveGroup(null)}
                className={cn("rounded text-xs border-transparent",
                  activeGroup === null ? 'bg-[var(--pri-grey-4)] text-muted-foreground' : ''
                )}
              >
                All
              </Badge>
              {baseRoles.map((group) => (
                <Badge
                  key={group.id}
                  variant={activeGroup === group.id ? 'outline_inactive' : 'outline_inactive'}
                  onClick={() => setActiveGroup(group.id)}
                  className={cn("rounded text-xs border-transparent",
                    activeGroup === group.id ? 'bg-[var(--pri-grey-4)] text-muted-foreground' : ''
                  )}
                >
                  {group.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="mt-4">
            <input
              type="search"
              placeholder="Search by role name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-md"
            />
          </div>

          {/* Sub-Role Badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {subRoles.map((role) => {
              const isSelected = selected.some((r) => r.id === role.id);
              return (
                <Badge
                  key={role.id}
                  variant={'green'}
                  className={`cursor-pointer text-xs rounded px-3 py-1 ${isSelected ? 'bg-green-100' : ''
                    }`}
                  onClick={() => toggleRole(role)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {role.name}
                </Badge>
              );
            })}
          </div>
        </div>

        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <div className="page-container-footer">
              <Button
                variant="primary"
                size="lg"
                className="text-xs md:text-sm px-5!"
                onClick={() => onConfirm(selected)}
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
