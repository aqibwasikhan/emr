'use client';

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, CircleMinus } from 'lucide-react';

type Props = {
  modules: any[];
  selectedPermissions: Record<number, Record<number, Set<number>>>;
  onPermissionToggle: (
    modId: number,
    resId: number,
    permId: number,
    checked: boolean
  ) => void;
};

export default function AssignPermissions({
  modules,
  selectedPermissions,
  onPermissionToggle,
}: Props) {
  return (
    <div>
      <span className="font-semibold text-sm text-foreground">Assign Permissions</span>

      {modules.map((module) => (
        <Collapsible key={module.id} defaultOpen className="bg-accent py-2 border-none rounded-xl mt-4">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between px-4 py-2 cursor-pointer">
              <h3 className="text-sm font-semibold text-secondary">{module.name}</h3>
              <div className="text-primary">
                <Plus className="w-4 h-4 collapsible-close:block hidden" />
                <CircleMinus className="w-4 h-4 collapsible-open:hidden block" />
              </div>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <Table className="bg-background">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] pl-4">Features</TableHead>
                  {['View Only', 'Add', 'Edit', 'Delete', 'Full Control'].map((head) => (
                    <TableHead key={head} className="text-center">{head}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {module.resources.map((res: any) => {
                  const resPerms: Set<number> = selectedPermissions[module.id]?.[res.id] || new Set();
                  const fullControlPerm = res.permissions.find((p: any) => p.name === 'Full Control');
                  const fullControlId = fullControlPerm?.id;
                  const isFullControl = fullControlId ? resPerms.has(fullControlId) : false;

                  return (
                    <TableRow key={res.id}>
                      <TableCell className="pl-4 font-semibold">{res.name}</TableCell>
                      {res.permissions.map((perm: any) => {
                        const isDisabled = isFullControl && perm.name !== 'Full Control';
                        const isChecked = resPerms.has(perm.id) || false;

                        return (
                          <TableCell key={perm.id} className="text-center">
                            <Checkbox
                              checked={isChecked}
                              disabled={isDisabled}
                              onCheckedChange={(checked) => {
                                // When checking full control, auto-select all
                                if (perm.name === 'Full Control') {
                                  if (checked) {
                                    res.permissions.forEach((p: any) => {
                                      onPermissionToggle(module.id, res.id, p.id, true);
                                    });
                                  } else {
                                    res.permissions.forEach((p: any) => {
                                      onPermissionToggle(module.id, res.id, p.id, false);
                                    });
                                  }
                                } else {
                                  onPermissionToggle(module.id, res.id, perm.id, checked === true);
                                }
                              }}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
