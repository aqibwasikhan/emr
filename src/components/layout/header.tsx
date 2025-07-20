import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { UserNav } from './user-nav';
import { ThemeSelector } from '../theme-selector';
import { ModeToggle } from './ThemeToggle/theme-toggle';
import Image from 'next/image';
import { LogoIcon } from '@/icons';

export default function Header() {
  return (
    <header className='flex  h-[72px] shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[72px]'>
      <div className='flex items-center gap-2 px-4'>
       
        <SidebarTrigger className='-ml-1 block md:hidden' />
        <Separator orientation='vertical' className='mr-2 h-4  block md:hidden' />
        <LogoIcon />
        {/* <Breadcrumbs /> */}
      </div>

      <div className='flex items-center gap-2 px-4'>
        {/* <div className='hidden md:flex'>
          <SearchInput />
        </div> */}
        {/* <ModeToggle /> */}
        {/* <ThemeSelector /> */}
        <UserNav />
      </div>
    </header>
  );
}
