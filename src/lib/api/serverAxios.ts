// lib/api/serverAxios.ts
'use server'
import axios from 'axios';
import { cookies } from 'next/headers';


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

    if (!accessToken) throw new Error('Authentication token is missing');

    instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }

  return instance;
}
