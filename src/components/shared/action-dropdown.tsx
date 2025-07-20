'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { IconDotsVertical } from '@tabler/icons-react';
import * as React from 'react';
import Link from 'next/link';

export interface DropdownAction {
  label?: string;
  icon?: React.ReactNode;
  onSelect?: () => void;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  separator?: boolean;
}

interface ActionDropdownProps {
  actions: DropdownAction[];
}

export function ActionDropdown({ actions }: ActionDropdownProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <IconDotsVertical className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {actions.map((action, idx) =>
          action.separator ? (
            <DropdownMenuSeparator key={`sep-${idx}`} />
          ) : (
            <DropdownMenuItem
              key={action.label}
              onSelect={action.onSelect}
              onClick={action.onClick}
              asChild={!!action.href}
            >
              {action.href ? (
                <Link href={action.href} className='flex items-center gap-2 w-full'>
                  {action.icon}
                  <span>{action.label}</span>
                </Link>
              ) : (
                <>
                  {action.icon}
                  <span className='ml-2'>{action.label}</span>
                </>
              )}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
