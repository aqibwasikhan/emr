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

  // Protect all /admin and /overview routes
  const protectedRoutes = ['/overview', '/admin', '/product', '/organization'];

  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );
if (req.nextUrl.pathname.startsWith('/auth') && token) {
  const redirectUrl = new URL('/overview', req.url);
  return NextResponse.redirect(redirectUrl);
}
  if (isProtected && !token) {
    const signInUrl = new URL('/auth/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Match only these routes
export const config = {
  matcher: ['/overview', '/admin/:path*', '/user-managments/:path*', '/organization/:path*','/facility/:path*','/roles/:path*'],
};

