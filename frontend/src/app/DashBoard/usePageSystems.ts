import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getDiagnostic } from '@/services/generated/diagnostic/diagnostic';
import type { DiagnosticOverview } from '@/services/generated/models';

export default function useDashboard() {
  const [data, setData] = useState<DiagnosticOverview | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await getDiagnostic().diagnosticControllerGetOverview();
      setData(response);
    } catch {
      toast.error('Failed to fetch diagnostic overview data. Please try again later.');
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { data, refetch: fetchData };
}
