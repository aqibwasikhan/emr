// // lib/api/serverAxios.ts
// 'use server'
// import axios from 'axios';
// import { cookies } from 'next/headers';


// export async function createServerEmrAxios(authRequired = true) {
//   const EMR_API_BASE_URL = process.env.NEXT_PUBLIC_EMR_API_BASE_URL;
//   const instance = axios.create({
//     baseURL: EMR_API_BASE_URL,
//     timeout: 30000,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   if (authRequired) {
//     const cookieStore = await cookies(); // ✅ no await needed here
//     const accessToken = cookieStore.get('accessToken')?.value;

//     if (!accessToken) { throw new Error('Session Expired'); }

//     instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return instance;
// }
'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createServerEmrAxios(authRequired = true) {
  const EMR_API_BASE_URL = process.env.NEXT_PUBLIC_EMR_API_BASE_URL;

  const instance = axios.create({
    baseURL: EMR_API_BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (authRequired) {
    const cookieStore = await cookies(); // ✅ no await needed here
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      // redirect('/auth/sign-in');
      throw new Error('Session Expired: Access token not found');
    }

    instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }

  // 🚨 Server-side interceptors can't redirect mid-request
  // But they can throw to be caught in calling function
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error('API token expired or unauthorized');

        // If needed, perform other cleanup (logging, analytics, etc.)
        // Cannot call `redirect('/login')` here in an interceptor

        // Throw a custom error that calling function can handle
        throw new Error('Unauthorized: Session expired or invalid token');

      }

      return Promise.reject(error);
    }
  );

  return instance;
}
