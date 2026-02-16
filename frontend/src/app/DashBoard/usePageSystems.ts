import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { fetchMockData } from './fetchMockData';
import type { TranslationOverview } from './types';

export default function useDashboard() {
  const [data, setData] = useState<TranslationOverview | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMockData();
        setData(response);
      } catch {
        toast.error('Failed to fetch translation overview data. Please try again later.');
      }
    };
    void fetchData();
  }, []);

  return { data };
}
