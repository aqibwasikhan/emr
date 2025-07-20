import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getValidTokenOrRedirect() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    redirect('/auth/sign-in'); // ⬅️ Adjust your login URL if needed
  }

  return accessToken;
}
