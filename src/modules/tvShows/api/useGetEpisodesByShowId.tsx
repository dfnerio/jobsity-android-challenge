import { useCallback, useEffect, useState } from 'react';
import { Episode } from '../types/episode';

interface GetEpisodesByShowIdProps {
  showId: number;
}

export const useGetEpisodesByShowId = ({
  showId,
}: GetEpisodesByShowIdProps) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getEpisodes = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.tvmaze.com/shows/${showId}/episodes`,
      );
      const json = await response.json();
      setEpisodes(json);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [showId]);

  useEffect(() => {
    getEpisodes();
  }, [getEpisodes]);

  return {
    episodes,
    loading,
    error,
  };
};
