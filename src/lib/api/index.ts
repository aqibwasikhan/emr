import { cookies } from "next/headers";

export const EMR_API_BASE_URL = process.env.NEXT_PUBLIC_EMR_API_BASE_URL;

export async function emrFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  { authRequired = true }: { authRequired?: boolean } = {}
): Promise<T> {
    const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  // If authRequired is true and no token → throw
  if (authRequired && !accessToken) {
    throw new Error('Authentication token is missing');
  }

  const headers = {
    ...(options.headers || {}),
    ...(authRequired && accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    'Content-Type': 'application/json', // or make this dynamic if needed
  };
  const res = await fetch(`${EMR_API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });
  // if (!res.ok) {
  //   throw new Error(`EMR API error: ${res.statusText}`);
  // }
  // return res.json() as Promise<T>;
  const json = await res.json().catch(() => null); // Handle case where no JSON body

  if (!res.ok) {
    const error = new Error(`EMR API error: ${res.status} ${res.statusText}`);
    (error as any).details = json; // Attach the full error response
    throw error;
  }
  return json as T;
}
