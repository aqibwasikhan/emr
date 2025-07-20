import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    // no token → send user to sign-in
    redirect('/auth/sign-in');
  }

  // token exists → go to overview
  redirect('/overview');
}
