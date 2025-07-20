"use server";
import { Organization } from "@/types/organization";
import { createServerEmrAxios } from "../../../lib/api/serverAxios";

interface OrgApiResponse {
  success: boolean;
  message: string;
  errors: Record<string, any>;
  data: Organization[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
  };
}
interface AddOrgResponse {
  success: boolean;
  message: string;
  errors?: Record<string, any>;
  data?: any;
}
export async function getOrganizations({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string | null;
}) {
  console.log('calling it')
  try {
    const client = await createServerEmrAxios(); // auth required by default

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search ? { search } : {}),
    });

    const res = await client.get<OrgApiResponse>(
      `/organization/all/?${queryParams.toString()}`
    );
    const data = res.data;

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch organizations");
    }

    return {
      organizations: data.data,
      total: data.pagination.total,
      pagination: data.pagination,
    };
  } catch (err: any) {
    const isAxiosError = !!err?.isAxiosError;
    const status = err?.response?.status;
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Unexpected error occurred";
    const errors = err?.response?.data?.errors || {};

    if (isAxiosError && !err.response) {
      // Network-level error (e.g., socket hang up, ECONNREFUSED)
      console.log("Network or connection error:", err.message);
      throw new Error(
        "Network error while fetching organizations. Please try again."
      );
    }

    console.log("API Error:", err.message);
    throw new Error(
      `${message}${
        Object.keys(errors).length
          ? " - " + Object.values(errors).join(", ")
          : ""
      }`
    );
  }
}
export async function getOrganizationById(id: number): Promise<Organization> {
  try {
    const client = await createServerEmrAxios();
    const res = await client.get<{
      success: boolean;
      data: Organization;
      message: string;
    }>(`/organization/${id}`);

    if (!res.data.success || !res.data.data) {
      throw new Error(res.data.message || "Organization not found");
    }

    return res.data.data;
  } catch (error: any) {
    console.error("Error fetching organization:", error.message);
    throw new Error(error.message || "Failed to fetch organization");
  }
}

export async function addOrganization(
  payload: Record<string, any>
): Promise<AddOrgResponse> {
  try {
    const client = await createServerEmrAxios();
    const res = await client.post<AddOrgResponse>(
      "/organization/create/",
      payload
    );
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
export async function updateOrganization(
  id: number,
  payload: Record<string, any>
): Promise<AddOrgResponse> {
  try {
    const client = await createServerEmrAxios();
    const res = await client.patch(`/organization/update/${id}`, payload);
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
