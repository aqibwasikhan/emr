import localFont from 'next/font/local';

export const proximaNova = localFont({
  src: [
    {
      path: '../../public/fonts/proxima-nova/ProximaNova-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/proxima-nova/ProximaNova-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/proxima-nova/ProximaNova-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    // etc.
  ],
  variable: '--font-sans',
  display: 'swap',
});
