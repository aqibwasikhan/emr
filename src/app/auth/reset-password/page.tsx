import { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { decryptValue } from '@/app/actions/crypto';
import ChangePasswordForm from '@/features/auth/components/change-password-form';
import ResetPasswordForm from '@/features/auth/components/reset-password-form';

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {

    const { token } = await searchParams;

    let decryptedData;
    if (token) {
        // Optional: Redirect to login if no token present
        try {
            // ✅ Decrypt token
            decryptedData = await decryptValue(token);
        } catch (err: any) {
            console.error('Failed to decrypt token:', err);
            redirect('/auth/sign-in?error=invalid-token');
        }
    } else {
        redirect('/auth/forget-password?error=invalid-url');

    }

    return (

        <div className='flex items-center justify-center h-full w-full'>
            <div className='w-full max-w-lg space-y-6'>
                <div className='flex justify-start pr-4 pt-8 lg:pr-0 lg:pt-0'>
                    <Image src='/images/Logo.png' alt='ACPlus Logo' width={169} height={45} className='mr-4' />
                </div>

                <div className='space-y-2 text-left'>
                    <h1 className='text-2xl text-foreground font-bold tracking-tight'>Set Password</h1>
                    <p className='text-xl text-muted-foreground'>Please set your new password here.</p>
                </div>
                <ResetPasswordForm token={decryptedData} />
            </div>
        </div>
    )

}

