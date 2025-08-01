// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { NextRequest } from 'next/server';

// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

// export default clerkMiddleware(async (auth, req: NextRequest) => {
//   if (isProtectedRoute(req)) await auth.protect();
// });
// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)'
//   ]
// };
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;

  const pathname = req.nextUrl.pathname;

  // Protected routes if user is NOT logged in
  const protectedRoutes = [
    '/overview',
    '/admin',
    '/product',
    '/organization',
    '/roles',
    '/user-management',
    '/facility',
  ];

  const isProtected = protectedRoutes.some((path) =>
    pathname.startsWith(path)
  );

  // 🔒 Redirect logged-in users away from auth pages
  if (pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL('/overview', req.url));
  }

  // 🔐 Redirect guests trying to access protected routes
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  // 🔁 Redirect root '/' to login or overview
  if (pathname === '/') {
    return NextResponse.redirect(new URL(token ? '/overview' : '/auth/sign-in', req.url));
  }

  return NextResponse.next();
}

// ✅ Match root + all protected/app routes
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/',
    '/overview',
    '/admin/:path*',
    '/user-management/:path*',
    '/organization/:path*',
    '/facility/:path*',
    '/roles/:path*',
    '/auth/:path*',
  ],
};
