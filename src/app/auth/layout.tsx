// app/auth/layout.tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    // If token exists, user is already authenticated → redirect to dashboard
    if (token) {
        redirect('/');
    }

    return <>{children}</>;
}
