// lib/fetcher.ts
export const createFetcherWithToken = (token: string) => async (url: string) => {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
  
    return res.json();
  };
  