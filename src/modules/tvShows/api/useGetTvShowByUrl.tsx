import { useCallback, useState } from 'react';

export const useGetTvShowByUrl = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getTvShowByUrl = useCallback(async (url: string) => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(url);

      let json = await response.json();

      return json;
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getTvShowByUrl,
    loading,
    error,
  };
};
