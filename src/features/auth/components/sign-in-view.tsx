'use client';

import UserAuthForm from './user-auth-form'; // your custom form
import Image from 'next/image'; // Keep if you're still using it for the logo, otherwise remove

export default function SignInViewPage() {
  return (
    <div className='grid h-screen lg:grid-cols-2 p-4  bg-background'>
      {/* Left Panel - Background Image and Content */}
      <div
        className='relative hidden lg:flex flex-col rounded-[20px] bg-muted p-10 justify-end' // Changed justify-between to justify-end
        style={{
          backgroundImage: 'url(/images/BG.webp)', // Set background image directly via CSS
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
        }}
      >


        {/* Bottom Section - Seamless & Secure Access */}
        <div className='relative z-10 text-white mb-8 '>
          <h3 className='text-2xl font-bold'>Seamless & Secure Access to Your <br /> Therapy EMR</h3>
          <p className='mt-2 text-base'>
            Effortless login with multi-factor authentication, ensuring secure access to patient therapy evaluations anytime.
          </p>
          {/* <div className='flex mt-4 space-x-2'>
            <span className='h-2 w-2 rounded-full bg-white opacity-50'></span>
            <span className='h-2 w-2 rounded-full bg-white'></span>
            <span className='h-2 w-2 rounded-full bg-white opacity-50'></span>
          </div> */}
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className='flex flex-col h-full p-4 lg:p-8'>
        {/* Spacer to push content to center/bottom */}
        <div className=' flex items-center justify-center '>
          {/* ACPlus Logo and Login Form - This entire block will be centered */}
          <div className='w-full max-w-lg space-y-6 lg:mt-30 '>
            {/* ACPlus Logo */}
            <div className='flex justify-start pr-4 pt-8 lg:pr-0 lg:pt-0'>
              <Image
                src='/images/Logo.png' // Keep this path as is, or update if your logo path changes
                alt='ACPlus Logo'
                width={169} // Adjust width as needed
                height={45} // Adjust height as needed
                className='mr-4'
              />
            </div>

            <div className='space-y-2 text-center lg:text-left'>
              <h1 className='text-2xl text-foreground font-bold tracking-tight'>Login to continue</h1>
              <p className='text-xl text-muted-foreground'>Please login with your credentials</p>
            </div>

            <UserAuthForm />
          </div>
        </div>

        {/* Back to Clinician Login - This div will be at the bottom */}
        {/* <div className='text-center pb-4'> 
    <a href='#' className='text-xl text-[var(--secondary)] hover:underline flex items-center justify-center'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6 mr-1'
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
      </svg>
      Back to Clinician Login
    </a>
  </div> */}
      </div>
    </div>
  );
}