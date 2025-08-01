'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { CustomInput } from '@/components/ui/custom/CustomInput';
import { EyeToggleIcon, RightArrowIcon, VaultIcon } from '@/icons';
import { Button } from '@/components/ui/button';
import { LockIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { resetPassword, respondToNewPasswordChallenge } from '@/app/actions/auth';

const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(6, 'Password must be at least 6 characters long'),
        confirmPassword: z.string().min(6, 'Confirm password must match'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
interface ResetProps {
    token: any;
}
export default function ResetPasswordForm({ token }: ResetProps) {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
    });


    const onSubmit = (data: ResetPasswordValues) => {
        startTransition(async () => {
            try {
                const { newPassword } = data;
                const { code, email } = token;
                const result = await resetPassword({
                    mode: 'confirm-code',
                    email,
                    code,
                    newPassword, // Replace later
                });
                toast.success('Password updated successfully!');
                router.push('/auth/sign-in'); // or wherever you want
            } catch (err: any) {
                console.error('Password update error:', err);
                toast.error(err.message || 'Something went wrong');
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-full max-w-md'>
                {/* New Password */}
                <FormField
                    control={form.control}
                    name='newPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <CustomInput
                                    label='New Password'
                                    size='lg'
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder='enter your new password'
                                    icon={<VaultIcon className='w-5 h-5 text-muted-foreground' />}
                                    rightIcon={
                                        <EyeToggleIcon show={showNewPassword} className='w-5 h-5 text-gray-400' />
                                    }
                                    onRightIconClick={() => setShowNewPassword((prev) => !prev)}
                                    disabled={loading}
                                    {...field}
                                    errorText={form.formState.errors.newPassword?.message}
                                    state={form.formState.errors.newPassword ? 'error' : 'default'}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Confirm Password */}
                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <CustomInput
                                    size='lg'
                                    label='Confirm Password'
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder='re-enter your new password'
                                    icon={<VaultIcon className='w-5 h-5 text-muted-foreground' />}
                                    rightIcon={
                                        <EyeToggleIcon show={showConfirmPassword} className='w-5 h-5 text-gray-400' />
                                    }
                                    onRightIconClick={() => setShowConfirmPassword((prev) => !prev)}
                                    disabled={loading}
                                    {...field}
                                    errorText={form.formState.errors.confirmPassword?.message}
                                    state={form.formState.errors.confirmPassword ? 'error' : 'default'}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type='submit' className='w-full mt-4 ' // Adjusted button color and rounded corners
                    variant="primary" loading={loading}>
                    Continue <RightArrowIcon className='ml-2' />
                </Button>
            </form>
        </Form>
    );
}
