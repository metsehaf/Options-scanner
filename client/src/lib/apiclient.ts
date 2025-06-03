// lib/apiClient.ts
import axios from 'axios';
import { NextApiRequest } from 'next';
import { Session } from '@auth0/nextjs-auth0'; // Still needed for server-side context

// Cache for the token to avoid refetching it for every single request
let cachedClientToken: string | null = null;
let tokenFetchPromise: Promise<string | null> | null = null; // To prevent multiple simultaneous fetches

// Function to fetch the token from your /api/token endpoint
const getClientToken = async (): Promise<string | null> => {
  if (cachedClientToken) {
    return cachedClientToken; // Return cached token if available
  }

  // If a token fetch is already in progress, wait for it
  if (tokenFetchPromise) {
    return tokenFetchPromise;
  }

  // Otherwise, initiate the fetch
  tokenFetchPromise = (async () => {
    try {
      const res = await fetch("/api/token"); // Your custom API route to get the token
      if (!res.ok) {
        throw new Error(`Failed to fetch token: ${res.status}`);
      }
      const json = await res.json();
      if (json.token) {
        cachedClientToken = json.token; // Cache the token
        return json.token;
      }
      console.error("No token found in /api/token response.");
      return null;
    } catch (error) {
      console.error("Error fetching token from /api/token:", error);
      cachedClientToken = null; // Clear cached token on error
      return null;
    } finally {
      tokenFetchPromise = null; // Clear the promise regardless of success/failure
    }
  })();

  return tokenFetchPromise;
};

// Create a default Axios instance (primarily for client-side use)
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor for the default client-side instance
apiClient.interceptors.request.use(
  async (config) => { // Make the interceptor async
    let acceptLanguage: string | null = null;

    if (typeof window !== 'undefined') {
      // Client-side: Fetch and attach the token
      // This will only fetch from /api/token once and then use the cached value
      const token = await getClientToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      acceptLanguage = localStorage.getItem('userLanguage') || navigator.language;
    }
    // Server-side default instance won't run this path, it relies on `createApiClient`

    if (acceptLanguage) {
      config.headers['Accept-Language'] = acceptLanguage;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (optional, but good for error handling, token refresh, etc.)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized request. Redirecting to login...');
      if (typeof window !== 'undefined') {
        cachedClientToken = null; // Clear cached token on 401
        window.location.href = '/api/auth/login'; // Redirect to Auth0 login
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Creates an API client instance.
 * For server-side usage, injects Auth0 session token.
 *
 * @param session Optional Auth0 Session object for server-side usage.
 * @param req Optional NextApiRequest object for additional header forwarding (e.g., cookies).
 * @returns An Axios instance configured with default headers and interceptors.
 */
export const createApiClient = (session?: Session | null, req?: NextApiRequest) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Server-side specific headers (if session or req is provided)
  if (session && session.accessToken) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${session.accessToken}`;
  } else if (req && req.headers.authorization) {
    // Fallback: if session not provided but auth header is explicitly there (e.g. from client fetch to Next.js API)
    instance.defaults.headers.common['Authorization'] = req.headers.authorization;
  }

  if (req && req.headers['accept-language']) {
    instance.defaults.headers.common['Accept-Language'] = req.headers['accept-language'];
  } else {
    const acceptLanguage = typeof window !== 'undefined' ? (localStorage.getItem('userLanguage') || navigator.language) : (process.env.DEFAULT_API_LANGUAGE || 'en-US,en;q=0.9');
    if (acceptLanguage) {
      instance.defaults.headers.common['Accept-Language'] = acceptLanguage;
    }
  }

  if (req && req.headers.cookie) {
    instance.defaults.headers.common['Cookie'] = req.headers.cookie;
  }

  // It's generally good practice to apply the common response interceptor to all instances
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized request (instance). Redirecting to login...');
        if (typeof window !== 'undefined') {
          cachedClientToken = null; // Clear cached token on 401 for this instance too
          window.location.href = '/api/auth/login';
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default apiClient; // Export the default client for client-side usage