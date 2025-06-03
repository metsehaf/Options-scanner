// lib/services/apiService.ts
import apiClient, { createApiClient } from '../apiclient'; // Our configured Axios instances
import { NextApiRequest } from 'next';
import { Session } from '@auth0/nextjs-auth0'; // Assuming Auth0 Session type

// Define a type for common request options
interface RequestOptions {
  params?: Record<string, any>; // Query parameters
  data?: any; // Request body for POST, PUT, PATCH
  headers?: Record<string, string>; // Custom headers for a specific request
}

export const apiService = {
  // --- Client-side / Default Server-side Methods ---
  // These methods use the globally configured apiClient (which handles client-side token fetching)

  get: async <T>(url: string, options?: RequestOptions): Promise<T> => {
    const response = await apiClient.get<T>(url, { params: options?.params, headers: options?.headers });
    return response.data;
  },

  post: async <T>(url: string, data: any, options?: RequestOptions): Promise<T> => {
    const response = await apiClient.post<T>(url, data, { params: options?.params, headers: options?.headers });
    return response.data;
  },

  put: async <T>(url: string, data: any, options?: RequestOptions): Promise<T> => {
    const response = await apiClient.put<T>(url, data, { params: options?.params, headers: options?.headers });
    return response.data;
  },

  patch: async <T>(url: string, data: any, options?: RequestOptions): Promise<T> => {
    const response = await apiClient.patch<T>(url, data, { params: options?.params, headers: options?.headers });
    return response.data;
  },

  delete: async <T>(url: string, options?: RequestOptions): Promise<T> => {
    const response = await apiClient.delete<T>(url, { params: options?.params, headers: options?.headers });
    return response.data;
  },

  // --- Server-side Specific Methods ---
  // These methods require the session and/or req object for context (Auth0 token, cookies, etc.)
  // They create a new, dedicated Axios instance for each request to avoid state leakage.

  getSSR: async <T>(url: string, session?: Session | null, req?: NextApiRequest, options?: RequestOptions): Promise<T> => {
    const ssrApiClient = createApiClient(session, req);
    const response = await ssrApiClient.get<T>(url, { params: options?.params, headers: options?.headers });
    return response.data;
  },

  postSSR: async <T>(url: string, data: any, session?: Session | null, req?: NextApiRequest, options?: RequestOptions): Promise<T> => {
    const ssrApiClient = createApiClient(session, req);
    const response = await ssrApiClient.post<T>(url, data, { params: options?.params, headers: options?.headers });
    return response.data;
  },

  putSSR: async <T>(url: string, data: any, session?: Session | null, req?: NextApiRequest, options?: RequestOptions): Promise<T> => {
    const ssrApiClient = createApiClient(session, req);
    const response = await ssrApiClient.put<T>(url, data, { params: options?.params, headers: options?.headers });
    return response.data;
  },

  patchSSR: async <T>(url: string, data: any, session?: Session | null, req?: NextApiRequest, options?: RequestOptions): Promise<T> => {
    const ssrApiClient = createApiClient(session, req);
    const response = await ssrApiClient.patch<T>(url, data, { params: options?.params, headers: options?.headers });
    return response.data;
  },

  deleteSSR: async <T>(url: string, session?: Session | null, req?: NextApiRequest, options?: RequestOptions): Promise<T> => {
    const ssrApiClient = createApiClient(session, req);
    const response = await ssrApiClient.delete<T>(url, { params: options?.params, headers: options?.headers });
    return response.data;
  },
};