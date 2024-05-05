import { useCallback, useEffect, useState } from 'react';
import { Person } from '../types/Person';

interface useGetPeopleProps {
  page?: number;
  query?: string;
}

export const useGetPeople = ({ page = 1, query }: useGetPeopleProps) => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getPeople = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const response = query
        ? await fetch(`https://api.tvmaze.com/search/people?q=${query}`)
        : await fetch(`https://api.tvmaze.com/people?page=${page}`);

      let json = await response.json();

      if (query) {
        json = json.map((item: { person: Person }) => item.person);
      }
      setPeople(json);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [page, query]);

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  return {
    data: people,
    loading,
    error,
    reloadData: getPeople,
  };
};
