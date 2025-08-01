// app/auth/forget-password/page.tsx
import ForgotPasswordForm from '@/features/auth/components/forgot-password-form';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Forgot Password',
    description: 'Reset your password via email.',
};

export default function Page() {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="w-full max-w-lg space-y-6">
                <div className="flex justify-start pr-4 pt-8 lg:pr-0 lg:pt-0">
                    <Image src="/images/Logo.png" alt="ACPlus Logo" width={169} height={45} className="mr-4" />
                </div>

                <div className="space-y-2 text-center lg:text-left">
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Enter Email Address</h1>
                    <p className="text-xl text-muted-foreground">
                        You’ll receive a Code to your email to reset your password
                    </p>
                </div>

                <ForgotPasswordForm />
            </div>
        </div>
    );
}
