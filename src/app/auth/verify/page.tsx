
import { decryptValue } from '@/app/actions/crypto';
import VerifyForgotOtpForm from '@/features/auth/components/verify-forgot-otp-form';
import Image from 'next/image';
import { redirect } from 'next/navigation';


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
      // ✅ Decrypt sessions
      decryptedData = await decryptValue(token);
    } catch (err: any) {
      console.error('Failed to decrypt token:', err);
      redirect('/auth/forgot-password?error=invalid-token');
    }

  } else {
    redirect('/auth/sign-in?error=invalid-url');

  }
  return (
    <div className='flex items-center justify-center h-full w-full'>
      <div className='w-full max-w-lg space-y-6'>
        {/* Logo */}
        <div className='flex justify-start pt-8'>
          <Image src='/images/Logo.png' alt='ACPlus Logo' width={169} height={45} />
        </div>

        {/* Headings */}
        <div className='space-y-2 text-left'>
          <h1 className='text-2xl font-bold text-foreground'>Enter verification code</h1>
          <p className='text-base text-muted-foreground'>
            A 6-digits code has been sent to your email address. Please enter code to continue.
          </p>
        </div>

        <VerifyForgotOtpForm email={decryptedData.email} />
      </div>
    </div>
  );
}

