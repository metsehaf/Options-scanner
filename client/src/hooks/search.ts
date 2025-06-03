import { useEffect, useState } from "react";
import { useDebouncedValue } from "@hooks/debounce";
import { SearchResult } from "@types/search";
import { searchService } from "@lib/services/searchService";

export function useSearch(query: string, market: string, enabled: boolean) {
  const debouncedSearch = useDebouncedValue(query, 400);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      // Skip only if market is not selected
      console.log(enabled);
      if (!enabled || query === "") return;

      setLoading(true);

      try {
        if (!isMounted) return;
        const response = await searchService.searchStock(
          debouncedSearch,
          market
        );
        console.log("Search results:", response);
        setResults(response || []);
      } catch (error) {
        console.error("Search error:", error);
        if (isMounted) setResults([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [debouncedSearch, market, enabled]);

  return { results, loading };
}
