import axios from 'axios';
import { cookies } from 'next/headers';

export const EMR_API_BASE_URL = process.env.NEXT_PUBLIC_EMR_API_BASE_URL;

export async function createEmrAxios(authRequired = true) {
  const instance = axios.create({
    baseURL: EMR_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (authRequired) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) throw new Error('Authentication token is missing');

    instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }

  return instance;
}
