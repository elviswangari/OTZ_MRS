import { useState, useEffect } from 'react';
import { getRequest } from '@/Axios';

export const useVisitData = (endpoint) => {
  const [visitData, setVisitData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRequest(endpoint);
        setVisitData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint]);

  return { visitData, loading };
};
