import { useCallback, useEffect, useState } from 'react';
import { Appearance } from '../types/Appearance';
import { API_BASE_URL } from '../../../utils/consts';

interface useGetAppearancesProps {
  personId: number;
}

export const useGetAppearances = ({ personId }: useGetAppearancesProps) => {
  const [appearances, setAppearances] = useState<Appearance[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getAppearances = useCallback(async () => {
    try {
      console.log(personId);
      setLoading(true);
      setError(false);
      const response = await fetch(
        API_BASE_URL + `/people/${personId}/castcredits`,
      );

      let json = await response.json();

      console.log(json);

      setAppearances(json);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [personId]);

  useEffect(() => {
    getAppearances();
  }, [getAppearances]);

  return {
    data: appearances,
    loading,
    error,
  };
};
