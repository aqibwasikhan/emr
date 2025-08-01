'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { CustomInput } from '@/components/ui/custom/CustomInput';
import { EmailIcon, RightArrowIcon } from '@/icons';
import { Button } from '@/components/ui/button';
import { resetPassword } from '@/app/actions/auth';
import { encryptData } from '@/lib/utils/crypto/crypto';

const emailSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type EmailFormValues = z.infer<typeof emailSchema>;

export default function ForgotPasswordForm() {
    const router = useRouter();
    const [loading, startTransition] = useTransition();

    const form = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = (values: EmailFormValues) => {
        startTransition(async () => {
            const res = await resetPassword({ mode: 'send-code', email: values.email });

            if (res.success) {
                toast.success(res.message);
                const encryptEmail = encryptData({ email: values.email })
                router.push(`/auth/verify?token=${encryptEmail}`);
            } else {
                toast.error(res.message);
            }
        });
    };

    return (


        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-full max-w-md'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <CustomInput
                                    size='lg'
                                    label='Email Address'
                                    placeholder='e.g. johndoe@email.com'
                                    {...field}
                                    disabled={loading}
                                    icon={<EmailIcon width={20} height={21}  stroke={'var(--muted-foreground)'} />}
                                    errorText={form.formState.errors.email?.message}
                                    state={form.formState.errors.email ? 'error' : 'default'}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type='submit' className='w-full mt-4' variant='primary' loading={loading}>
                    Send Code <RightArrowIcon className='ml-2' />
                </Button>
            </form>
        </Form>

    );
}
