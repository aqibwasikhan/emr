// 'use client';
// import { ClerkProvider } from '@clerk/nextjs';
// import { dark } from '@clerk/themes';
// import { useTheme } from 'next-themes';
// import React from 'react';
// import { ActiveThemeProvider } from '../active-theme';

// export default function Providers({
//   activeThemeValue,
//   children
// }: {
//   activeThemeValue: string;
//   children: React.ReactNode;
// }) {
//   // we need the resolvedTheme value to set the baseTheme for clerk based on the dark or light theme
//   const { resolvedTheme } = useTheme();

//   return (
//     <>
//       <ActiveThemeProvider initialTheme={activeThemeValue}>
//         <ClerkProvider
//           appearance={{
//             baseTheme: resolvedTheme === 'dark' ? dark : undefined
//           }}
//         >
//           {children}
//         </ClerkProvider>
//       </ActiveThemeProvider>
//     </>
//   );
// }
// src/components/layout/Providers.tsx
'use client';

import React from 'react';
import { ActiveThemeProvider } from '../active-theme';

interface ProvidersProps {
  activeThemeValue: string;
  children: React.ReactNode;
}

export default function Providers({ activeThemeValue, children }: ProvidersProps) {
  return (
    <ActiveThemeProvider initialTheme={activeThemeValue}>
      {children}
    </ActiveThemeProvider>
  );
}
