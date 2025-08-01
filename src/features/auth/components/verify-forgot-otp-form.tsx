'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { RightArrowIcon } from '@/icons';
import { Button } from '@/components/ui/button';
import { resetPassword } from '@/app/actions/auth';
import { CustomOtpInput } from '@/components/ui/custom/CustomOtpInput';
import { encryptData } from '@/lib/utils/crypto/crypto';

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, 'OTP must be 6 digits')
    .max(6, 'OTP must be 6 digits')
    .regex(/^\d{6}$/, 'OTP must be numeric'),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function VerifyForgotOtpForm({ email }: { email: string }) {
  const router = useRouter();
  const [loading, startTransition] = useTransition();
  const [cooldown, setCooldown] = useState(0); // seconds remaining
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });
  // Countdown effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);
  const onSubmit = (values: OtpFormValues) => {
    startTransition(async () => {
      const res = await resetPassword({
        mode: 'confirm-code',
        email,
        code: values.otp,
        newPassword: 'temp', // Replace later
      });

      if (res.message === 'Password does not conform to policy: Password not long enough') {
        toast.success("Otp Verify SuccessFull");
        const encryptEmailAndOtp = encryptData({ email, code: values.otp })
        router.push(`/auth/reset-password?token=${encryptEmailAndOtp}`);
      } else {
        toast.error(res.message);
      }
    });
  };
  const handleResendCode = async () => {
    if (cooldown > 0) return; // prevent click during cooldown

    const res = await resetPassword({ mode: 'send-code', email });

    if (res.success) {
      toast.success('Resend Code Successful');
      setCooldown(30); // start 30s cooldown
    } else {
      toast.error(res.message || 'Failed to resend code');
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-full max-w-md'>
        <FormField
          control={form.control}
          name='otp'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomOtpInput
                  value={field.value}
                  onChange={field.onChange}
                  length={6}
                  onlyNumbers
                  disabled={loading}
                  inputClassName='text-xl'
                />
              </FormControl>
              {form.formState.errors.otp && (
                <p className='text-sm text-destructive mt-1'>
                  {form.formState.errors.otp.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full mt-4' variant='primary' loading={loading}>
          Verify Code <RightArrowIcon className='ml-2' />
        </Button>
        <div className='flex justify-center mt-8'>
          <Button
            type='button'
            variant='link'
            disabled={cooldown > 0}
            onClick={handleResendCode}
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Code'}
          </Button>
          
        </div>
      </form>
    </Form>
  );
}
