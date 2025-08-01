import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import UserDirectoryLoader from '@/components/layout/UserDirectoryLoader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'EMR Dashboard',
  description: 'Accelerated Care Plus'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  //   const token = cookieStore.get('token')?.value;

  // if (!token) {
  //   redirect('/auth/sign-in');
  // }
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  // const defaultOpen = false
  return (
    <KBar>

      {/* Wrap everything in a column flex container */}
      <div className='max-w-[1920px] mx-auto'>
        <UserDirectoryLoader />
        <SidebarProvider defaultOpen={defaultOpen}>
          {/* <div className="flex h-screen flex-col"> */}
          {/* 1) HEADER spans full width */}
          <Header />

          {/* 2) below the header, use a row flex container for sidebar + content */}
          <div className="flex flex-1 overflow-hidden">
            {/* 2a) Sidebar on the left */}
            <AppSidebar />

            {/* 2b) Main content to the right of sidebar */}
            <SidebarInset >
              {children}
            </SidebarInset>
          </div>
          {/* </div> */}
        </SidebarProvider>
      </div>

    </KBar>
  );
}
