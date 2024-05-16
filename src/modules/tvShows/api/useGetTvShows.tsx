import { useCallback, useEffect, useState } from 'react';
import { TvShow } from '../types/tvShow';
import { API_BASE_URL } from '../../../utils/consts';

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
        ? await fetch(API_BASE_URL + `/search/shows?q=${query}`)
        : await fetch(API_BASE_URL + `/shows?page=${page}`);

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
    data: tvShows,
    loading,
    error,
    reloadData: getTvShows,
  };
};
