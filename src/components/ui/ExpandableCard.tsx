'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { PencilIcon } from '@/icons';
import * as React from 'react';

interface ExpandableCardProps {
  children: React.ReactNode;
  backgroundImage?: string;
  editLinkHref?: string;
}

export function ExpandableCard({
  children,
  backgroundImage = '/images/infoBg.png',
  editLinkHref = '/organization/add'
}: ExpandableCardProps) {
  return (
    <Card
      className={cn(
        "group flex flex-col md:flex-row items-start gap-4 rounded-2xl px-4 py-3 border-none relative",
        "duration-400 ease-in-out transition-all hover:px-7 hover:py-5 hover:shadow-lg hover:bg-opacity-90",
        "hover:h-56 h-20"
      )}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(67,67,67, 0), rgba(67,67,67, 100)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}

      <Link
        href={editLinkHref}
        className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'absolute top-0 right-0 rounded-tr-2xl')}
      >
        <PencilIcon viewBox="0 0 16 21" className="h-5 w-5" />
      </Link>
    </Card>
  );
}
