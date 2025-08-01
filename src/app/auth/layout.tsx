'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1];

    if (token) {
      setHasToken(true);
      router.replace('/');
    }
  }, []);

  if (hasToken) return null;

  return (
    <div className='grid h-screen lg:grid-cols-2 p-2 bg-background overflow-hidden'>
      {/* Left Panel */}
      <div className='p-4 flex-1  hidden lg:flex'>
        <div
          className='relative hidden lg:flex flex-col rounded-[20px] bg-muted p-10 justify-end overflow-hidden'
          style={{
            backgroundImage: 'url(/images/BG.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className='relative z-10 text-white mb-8'>
            <h3 className='text-2xl font-bold'>
              Seamless & Secure Access to Your <br /> Therapy EMR
            </h3>
            <p className='mt-2 text-base'>
              Effortless login with multi-factor authentication, ensuring secure access to patient
              therapy evaluations anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Animated children */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={pathname}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className='flex flex-col h-full p-4 lg:p-8'
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
