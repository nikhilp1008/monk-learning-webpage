import { supabase } from "@/lib/supabase";

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://monk-learning-api-production.up.railway.app";

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;

  if (!token) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new ApiError("No authentication session found", 401);
  }

  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  headers.set("Authorization", `Bearer ${token}`);

  const url = `${baseUrl.replace(/\/$/, "")}${
    endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  }`;

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new ApiError("Session expired or unauthorized", 401);
  }

  let responseData: unknown = null;
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    responseData = await res.json();
  } else {
    responseData = await res.text();
  }

  if (!res.ok) {
    const errorMsg =
      typeof responseData === "object" &&
      responseData !== null &&
      "detail" in responseData
        ? String((responseData as { detail: unknown }).detail)
        : typeof responseData === "string"
        ? responseData
        : `API request failed with status ${res.status}`;

    throw new ApiError(errorMsg, res.status, responseData);
  }

  return responseData as T;
}
