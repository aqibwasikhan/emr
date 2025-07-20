'use server';

import { createServerEmrAxios } from '@/lib/api/serverAxios';
import { showError } from '@/lib/toastUtils';
import { Facility } from '@/types/facilities';

export async function getFacilitiesByOrgId(
  orgId: number,
  page = 1,
  limit = 10
): Promise<{ facilities: Facility[]; total: number }> {
  try {
    const client = await createServerEmrAxios();

    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const res = await client.get<{
      success: boolean;
      data: Facility[];
      pagination: { total: number };
      message: string;
    }>(`/facility/organization/${orgId}/?${query.toString()}`);

    if (!res.data.success) {
      throw new Error(res.data.message || 'Failed to fetch facilities');
    }

    return {
      facilities: res.data.data,
      total: res.data.pagination.total,
    };
  } catch (err: any) {
    console.error('Error fetching facilities:', err);

    // Show the error message as a toast notification


    // Return empty facilities and total as a fallback
    return {
      facilities: [],
      total: 0,
    };
  }
}

export async function addFacility(payload: Facility) {
  try {
    const client = await createServerEmrAxios();
    const res = await client.post('/facility/create/', payload);

    const data = res.data;
    if (!data.success) {
      throw new Error(data.message || 'Failed to create facility');
    }

    return {
      success: true,
      message: data.message,
      facility: data.data,
    };
  } catch (err: any) {
    const message =
      err?.response?.data?.message || err.message || "Unknown error";
    const errors = err?.response?.data?.errors || {};
    return {
      success: false,
      message,
      errors,
    };
  }
}
export async function getFacilityById(id: number): Promise<Facility> {
  try {
    const client = await createServerEmrAxios();
    const res = await client.get<{
      success: boolean;
      data: Facility;
      message: string;
    }>(`/facility/${id}`);

    if (!res.data.success || !res.data.data) {
      throw new Error(res.data.message || "Facility not found");
    }

    return res.data.data;
  } catch (error: any) {
    console.error("Error fetching organization:", error.message);
    throw new Error(error.message || "Failed to fetch organization");
  }
}
export async function updateFacility(
  id: number,
  payload: Record<string, any>
) {
  try {
    const client = await createServerEmrAxios();
    const res = await client.patch(`/facility/update/${id}`, payload);
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to create organization");
    }

    return res.data;
  } catch (err: any) {
    const message =
      err?.response?.data?.message || err.message || "Unknown error";
    const errors = err?.response?.data?.errors || {};
    return {
      success: false,
      message,
      errors,
    };
  }
}
export async function getAllFacility({
}: {
  }): Promise<Facility> {
  try {
    const client = await createServerEmrAxios(); // auth required



    const res = await client.get<{
      success: boolean;
      data: Facility;
      message: string;
    }>(`/facility/all`);
    const data = res.data;

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch facility");
    }

    return data.data; // ✅ just return the role list
  } catch (err: any) {
    const isAxiosError = !!err?.isAxiosError;
    const status = err?.response?.status;
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Unexpected error occurred";
    const errors = err?.response?.data?.errors || {};

    if (isAxiosError && !err.response) {
      console.log("Network or connection error:", err.message);
      throw new Error(
        "Network error while fetching roles. Please try again."
      );
    }

    console.log("API Error:", err.message);
    throw new Error(
      `${message}${Object.keys(errors).length
        ? " - " + Object.values(errors).join(", ")
        : ""
      }`
    );
  }
}
export async function getAllFacilitySummary(){
  try {
    const client = await createServerEmrAxios(); // auth required
    const res = await client.get(`/facility/summary/all`);
    const data = res.data;

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch facility");
    }

    return data.data; // ✅ just return the role list
  } catch (err: any) {
    const isAxiosError = !!err?.isAxiosError;
    const status = err?.response?.status;
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Unexpected error occurred";
    const errors = err?.response?.data?.errors || {};

    if (isAxiosError && !err.response) {
      console.log("Network or connection error:", err.message);
      throw new Error(
        "Network error while fetching roles. Please try again."
      );
    }

    console.log("API Error:", err.message);
    throw new Error(
      `${message}${Object.keys(errors).length
        ? " - " + Object.values(errors).join(", ")
        : ""
      }`
    );
  }
}