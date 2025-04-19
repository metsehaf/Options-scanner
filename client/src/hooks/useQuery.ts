import { useRouter} from 'next/router';
export const useQuery = () => {
    const { query } = useRouter();
    return query; // Returns an object containing the query parameters
  };