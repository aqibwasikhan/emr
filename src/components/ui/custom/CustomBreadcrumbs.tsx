'use client';

import Link from 'next/link';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '../breadcrumb';
import * as React from 'react';
import { cn } from '@/lib/utils';
import _ from 'lodash';
type BreadcrumbEntry = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;  // ✅ new optional property
};

export function CustomBreadcrumbs({
  items
}: {
  items: BreadcrumbEntry[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const muted = item.active;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.href && !isLast ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href} className={cn('flex items-center gap-1', muted && 'text-muted-foreground')}>
                      {item.icon}
                      {/* {_.startCase(_.toLower(item.label))} */}
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className={cn('flex items-center gap-1', muted && 'text-muted-foreground')}>
                    {item.icon}
                    {/* {_.startCase(_.toLower(item.label))} */}
                      {item.label}

                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className={cn(muted ? 'text-muted-foreground' : 'text-secondary')}  />
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
