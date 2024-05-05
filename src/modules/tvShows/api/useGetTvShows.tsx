import { useCallback, useEffect, useState } from 'react';
import { TvShow } from '../types/tvShow';

interface useGetTvShowsProps {
  page?: number;
  query?: string;
}

export const useGetTvShows = ({ page = 1, query }: useGetTvShowsProps) => {
  const [tvShows, setTvShows] = useState<TvShow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getTvShows = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const response = query
        ? await fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
        : await fetch(`https://api.tvmaze.com/shows?page=${page}`);

      let json = await response.json();

      if (query) {
        json = json.map((item: { show: TvShow }) => item.show);
      }
      setTvShows(json);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [page, query]);

  useEffect(() => {
    getTvShows();
  }, [getTvShows]);

  return {
    tvShows,
    loading,
    error,
    reloadData: getTvShows,
  };
};
