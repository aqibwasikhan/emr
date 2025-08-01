import { Metadata } from 'next';
import SignInViewPage from '@/features/auth/components/sign-in-view';
import Image from 'next/image';
import UserAuthForm from '@/features/auth/components/user-auth-form';
import { decryptData, encryptData } from '@/lib/utils/crypto/crypto';
import { Credentials } from '@aws-sdk/types';
import { redirect } from 'next/navigation';
import { decryptValue, encryptValue } from '@/app/actions/crypto';
import { loginCognito } from '@/app/actions/auth';
export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign In page for authentication.'
};
// const encrypt_key = process.env.ENCRYPTION_KEY!;
// export default async function Page(){



export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {

  const { token } = await searchParams;

  if (token) {
    // Optional: Redirect to login if no token present
    let decryptedData;
    try {
      // ✅ Decrypt token
      decryptedData = await decryptValue(token);
      console.log('Decrypted Data:', decryptedData);
    } catch (err: any) {
      console.error('Failed to decrypt token:', err);
      redirect('/auth/sign-in?error=invalid-token');
    }

    let cognitoData;

    try {
      cognitoData = await loginCognito(decryptedData.email, decryptedData.password);
      console.log('cognitoData', cognitoData)

    } catch (err: any) {
      console.error('Cognito login failed:', err);
      redirect('/auth/sign-in?error=login-failed');
    }

    const { challengeName, session } = cognitoData;

    if (challengeName === 'NEW_PASSWORD_REQUIRED') {
      let encryptedSession: string;

      try {
        encryptedSession = await encryptValue({ session, email: decryptedData.email });
      } catch (err) {
        console.error('Failed to encrypt session', err);
        redirect('/auth/sign-in?error=invalid-session');
      }

      redirect(`/auth/change-password?sessions=${encryptedSession}`);
    }
  }

  return (

    <div className='flex items-center justify-center h-full w-full'>
      <div className='w-full max-w-lg space-y-6'>
        <div className='flex justify-start pr-4 pt-8 lg:pr-0 lg:pt-0'>
          <Image src='/images/Logo.png' alt='ACPlus Logo' width={169} height={45} className='mr-4' />
        </div>

        <div className='space-y-2 text-left'>
          <h1 className='text-2xl text-foreground font-bold tracking-tight'>Login to continue</h1>
          <p className='text-xl text-muted-foreground'>Please login with your credentials</p>
        </div>

        <UserAuthForm />
      </div>
    </div>
  )

}

