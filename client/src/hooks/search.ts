import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@hooks/debounce';
import { createFetcherWithToken } from '@lib/fetcher';
import { SearchResult } from '@types/search';

export  function useSearch(query: string) {
  const debouncedSearch = useDebouncedValue(query, 400);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!debouncedSearch) return;
      setLoading(true);

      try {
        // Step 1: Fetch the token from your backend
        const tokenRes = await fetch('/api/token');
        const tokenJson = await tokenRes.json();
        const token = tokenJson.token;

        if (!token || !isMounted) return;

        // Step 2: Call your NestJS API
        const fetcher = createFetcherWithToken(token);
        const results: SearchResult[] = await fetcher(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search?query=${debouncedSearch}`
        );

        if (isMounted) {
          console.log('Search results:', results);
          setResults(results || []);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [debouncedSearch]);

  return { results, loading };
}
