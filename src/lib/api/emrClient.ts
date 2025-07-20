import { createEmrAxios } from "./axios";


export async function emrGet<T>(url: string, auth = true): Promise<T> {
  const client = await createEmrAxios(auth);
  const { data } = await client.get<T>(url);
  return data;
}

export async function emrPost<T>(url: string, body: any, auth = true): Promise<T> {
  const client = await createEmrAxios(auth);
  const { data } = await client.post<T>(url, body);
  return data;
}

export async function emrPatch<T>(url: string, body: any, auth = true): Promise<T> {
  const client = await createEmrAxios(auth);
  const { data } = await client.patch<T>(url, body);
  return data;
}

export async function emrDelete<T>(url: string, auth = true): Promise<T> {
  const client = await createEmrAxios(auth);
  const { data } = await client.delete<T>(url);
  return data;
}
