'use server'
import { Organization } from '@/types/organization';
import { createServerEmrAxios } from '../../../lib/api/serverAxios';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { SectionConfig } from '@/types/forms';

interface OrgApiResponse {
    success: boolean;
    message: string;
    errors: Record<string, any>;
    data: SectionConfig[];
}

export async function getForms({
   param
}: {
   param: string;
}) {
    try {
        const client = await createServerEmrAxios(); // auth required by default
        const res = await client.get<OrgApiResponse>(`/forms/get/?${param}`);
        const data = res.data;

        if (!data.success) {
            throw new Error(data.message || 'Failed to fetch organizations');
        }
        return {
            config: data.data,
           
        };
    } catch (err: any) {
        const isAxiosError = !!err?.isAxiosError;
        const status = err?.response?.status;
        const message = err?.response?.data?.message || err?.message || 'Unexpected error occurred';
        const errors = err?.response?.data?.errors || {};

        if (isAxiosError && !err.response) {
            // Network-level error (e.g., socket hang up, ECONNREFUSED)
            console.log('Network or connection error:', err.message);
            throw new Error('Network error while fetching organizations. Please try again.');
        }

        console.log('API Error:', err.message);
        throw new Error(`${message}${Object.keys(errors).length ? ' - ' + Object.values(errors).join(', ') : ''}`);
    }

}
