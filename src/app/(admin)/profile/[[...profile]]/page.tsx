import ProfileViewPage from '@/features/profile/components/profile-view-page';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Dashboard : Profile'
};

export default async function Page() {
    notFound();
  
  return <ProfileViewPage />;
}
