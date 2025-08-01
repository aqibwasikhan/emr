"use server";
import { User, UserDetail } from "@/types/user-mangment";
import { createServerEmrAxios } from "../../../lib/api/serverAxios";
import { ModuleGroup, RoleDetail } from "@/types/roles";
import { ApiResponse } from "@/types/api";


interface AddAndUpdateResponse {
  success: boolean;
  message: string;
  errors?: Record<string, any>;
  data?: any;
}
export async function getAllUser({
  page = 1,
  limit = 10,
  search,
  user,
  role,
  status,
  organization
}: {
  page?: number;
  limit?: number;
  search?: string | null;
  user?: string | null;
  role?: string | null;
  status?: string | null; // ✅ NEW
  organization?: string | null; // ✅ NEW
}) {
  try {
    const client = await createServerEmrAxios(); // auth required

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search ? { search } : {}),
      ...(user ? { user } : {}),
      ...(role ? { role } : {}),
      ...(status ? { status } : {}),
      ...(organization ? { organization } : {})

    });
    const res = await client.get(`/user/all?${queryParams.toString()}`);
    const data = res.data;

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch users");
    }

    return {
      data: data.data,
      total: data.pagination.total,
      pagination: data.pagination
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
export async function getUserById(id: number): Promise<ApiResponse<UserDetail>> {
  try {
    const client = await createServerEmrAxios();
    const res = await client.get<ApiResponse<UserDetail>>(`/user/${id}`);

    if (!res.data.success || !res.data.data) {
      throw new Error(res.data.message || "User not found");
    }

    return res.data;
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    throw new Error(error.message || "Failed to fetch user");
  }
}
export async function addUser(
  payload: Record<string, any>
): Promise<AddAndUpdateResponse> {
  try {
    const client = await createServerEmrAxios();
    const res = await client.post<AddAndUpdateResponse>(
      "/user/create",
      payload
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to create User");
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
export async function updateUser(
  id: number | undefined | null,
  payload: Record<string, any>
): Promise<AddAndUpdateResponse> {
  try {
    const client = await createServerEmrAxios();
    const res = await client.patch(`/user/update/${id}`, payload);
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to update user");
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
export async function assignFacilityToUser(
  payload: Record<string, any>
): Promise<AddAndUpdateResponse> {
  try {
    const client = await createServerEmrAxios();
    const res = await client.post<AddAndUpdateResponse>(
      "/role/assignFacilities",
      payload
    );
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to Assign failityc");
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
export async function getUserDirectory() {
  try {
    const client = await createServerEmrAxios();
    const res = await client.get<ApiResponse<any>>(`/user/directory/details`);

    if (!res.data.success || !res.data.data) {
      throw new Error(res.data.message || "User not found");
    }

    return res.data;
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    throw new Error(error.message || "Failed to fetch user");
  }
}
// export function extractErrorMessage(result: AddAndUpdateResponse, fallback = 'An error occurred') {
//   return result.errors?.non_field_errors ?? result.message ?? fallback;
// }