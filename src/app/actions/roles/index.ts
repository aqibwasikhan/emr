"use server";
import { createServerEmrAxios } from "../../../lib/api/serverAxios";
import { ModuleGroup, RoleDetail } from "@/types/roles";

interface OrgApiResponse {
  success: boolean;
  message: string;
  errors: Record<string, any>;
  data: ModuleGroup[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
  };
}
interface AddAndUpdateResponse {
  success: boolean;
  message: string;
  errors?: Record<string, any>;
  data?: any;
}
export async function getRoles({
  page = 1,
  limit = 200,
  search,
}: {
  page: number;
  limit: number;
  search?: string | null;
}) {
  try {
    const client = await createServerEmrAxios(); // auth required

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search ? { search } : {}),
    });

    const res = await client.get(`/role/all?${queryParams.toString()}`);
    const data = res.data;

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch roles");
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
export async function getSubRoles({
  baseRoleId,
  search,
}: {
  baseRoleId?: number;
  search?: string | null;

}) {
  try {
    const client = await createServerEmrAxios(); // auth required

      const queryParams = new URLSearchParams({
      ...(baseRoleId !== undefined ? { baseRoleId: baseRoleId.toString() } : {}),
      ...(search ? { search } : {}),
    });
    const res = await client.get(`/role/summary/all?${queryParams.toString()}`);
    const data = res.data;

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch roles");
    }

    return data; // ✅ just return the role list
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
export async function getModuleById(
  id: number,
  baseRoleId?: number
): Promise<ModuleGroup> {
  try {
    const client = await createServerEmrAxios();

    const query = baseRoleId ? `?baseRoleId=${baseRoleId}` : '';
    const res = await client.get<{
      success: boolean;
      data: ModuleGroup[];
      message: string;
    }>(`/module/${id}${query}`);

    if (!res.data.success || !res.data.data) {
      throw new Error(res.data.message || "Module not found");
    }

    return res.data.data[0];
  } catch (error: any) {
    console.error("Error fetching module:", error.message);
    throw new Error(error.message || "Failed to fetch module");
  }
}

export async function getRoleById(id: number): Promise<RoleDetail> {
  try {
    const client = await createServerEmrAxios();
    const res = await client.get<{
      success: boolean;
      data: RoleDetail;
      message: string;
    }>(`/role/${id}`);

    if (!res.data.success || !res.data.data) {
      throw new Error(res.data.message || "Organization not found");
    }

    return res.data.data;
  } catch (error: any) {
    console.error("Error fetching organization:", error.message);
    throw new Error(error.message || "Failed to fetch organization");
  }
}


export async function addRole(
  payload: Record<string, any>
): Promise<AddAndUpdateResponse> {
  try {
    const client = await createServerEmrAxios();
    const res = await client.post<AddAndUpdateResponse>(
      "/role/create",
      payload
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to create role");
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
export async function updateRole(
  id: number,
  payload: Record<string, any>
): Promise<AddAndUpdateResponse> {
  try {
    const client = await createServerEmrAxios();
    const res = await client.patch(`/role/update/${id}`, payload);
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to update role");
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
