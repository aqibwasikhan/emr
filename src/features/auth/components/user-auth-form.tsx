
'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { CustomInput } from '@/components/ui/custom/CustomInput';
import { EmailIcon, EyeToggleIcon, RightArrowIcon, UserIcon } from '@/icons'; // Assuming UserIcon is not needed for password field itself
import { Checkbox } from '@/components/ui/checkbox'; // Import Checkbox
import { Label } from '@/components/ui/label'; // Import Label
import { Switch } from '@/components/ui/switch';
import { useAuthStore } from '@/stores/useAuthStore';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  rememberMe: z.boolean().default(false).optional(), // Added for remember me
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false, // Default value for rememberMe
    }
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.errors.non_field_errors ? result.errors.non_field_errors : result.message || 'An error occurred during login');
        return;
      }
      console.log(result);
      // ✅ Set user + tokens in your auth context
      login(result.data);  // or you can shape result.data before passing
      toast.success(result.message || 'Signed in successfully!');
      router.push(callbackUrl || '/organization?page=1'); // Redirect to the callback URL or default to organization page
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4'>
        {/* Email field */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput
                  type='email'
                  size='lg'
                  label='Email Address' // Changed to "Email Address"
                  placeholder='e.g. johndoe@email.com'
                  disabled={loading}
                  state={form.formState.errors.email ? 'error' : 'default'}
                  errorText={form.formState.errors.email?.message}
                  {...field}
                  className='rounded-xl'
                  icon={<EmailIcon width={20} height={21} stroke={form.formState.errors.email && 'var(--destructive)'} />}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Password field */}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput
                  type={showPassword ? 'text' : 'password'}
                  label='Password'
                  size='lg'
                  className='rounded-xl'
                  placeholder='enter your password' // Removed "..."
                  disabled={loading}
                  state={form.formState.errors.password ? 'error' : 'default'}
                  errorText={form.formState.errors.password?.message}
                  icon={<UserIcon width={20} height={21} stroke={form.formState.errors.password && 'var(--destructive)'} />}
                  rightIcon={<EyeToggleIcon show={showPassword} className='w-5 h-5 text-gray-400' />}
                  onRightIconClick={() => setShowPassword((prev) => !prev)}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Remember Me and Forget Password */}
        <div className='flex items-center justify-between text-sm mt-4'>
          <FormField
            control={form.control}
            name='rememberMe'
            render={({ field }) => (
              <FormItem className='flex items-center space-x-2 gap-1'>
                <FormControl>
                  <Switch
                    id='rememberMe'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={loading}
                  />
                </FormControl>
                <Label htmlFor='rememberMe' className='text-base md:text-base font-normal text-muted-foreground'>
                  Remember Me
                </Label>
              </FormItem>
            )}
          />
          <Link href='#' className='text-base md:text-base font-medium text-primary hover:underline'>
            Forget Password?
          </Link>
        </div>

        {/* Login button */}
        <Button
          loading={loading}
          className='w-full mt-4 ' // Adjusted button color and rounded corners
          variant="primary"
          type='submit'
        >
          Login <RightArrowIcon className='ml-2' />
        </Button>
      </form>
    </Form>
  );
}
