'use server';

import { createServerEmrAxios } from '@/lib/api/serverAxios';

export async function getAllLookupFacility(){
  try {
    const client = await createServerEmrAxios(); // auth required
    const res = await client.get(`/lookup/facility`);
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
export async function getAllLookupRoles(){
  try {
    const client = await createServerEmrAxios(); // auth required
    const res = await client.get(`/lookup/roles`);
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
export async function getAllLookupOrganization(){
  try {
    const client = await createServerEmrAxios(); // auth required
    const res = await client.get(`/lookup/organizations`);
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
export async function getAllLookupBaseRoles(){
  try {
    const client = await createServerEmrAxios(); // auth required
    const res = await client.get(`/lookup/baseRoles`);
    const data = res.data;

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch facility");
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