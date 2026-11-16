import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CountryData } from '../_types/authTypes';

interface CountryApiRecord {
  names: { common: string };
  codes: { alpha_2: string };
  calling_codes?: string[];
}

interface CountryApiResponse {
  data?: {
    objects?: CountryApiRecord[];
    meta?: { more?: boolean };
  };
  errors?: { message: string }[];
}

export const useCountryCodes = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const allCountries: CountryApiRecord[] = [];
        let offset = 0;
        let hasMore = true;
        const limit = 100;

        while (hasMore) {
          const response = await fetch(
            `https://api.restcountries.com/countries/v5?response_fields=names.common,codes.alpha_2,calling_codes&limit=${limit}&offset=${offset}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_COUNTRY_CODES_API}`,
              },
            },
          );

          const result = (await response.json()) as CountryApiResponse;
          if (!response.ok || result.errors?.length) {
            throw new Error(
              result.errors?.[0]?.message ?? 'Failed to fetch country data.',
            );
          }

          allCountries.push(...(result.data?.objects ?? []));
          hasMore = result.data?.meta?.more ?? false;
          offset += limit;
        }

        const formattedCountries = allCountries
          .map((countryData) => ({
            name: countryData.names.common,
            code: countryData.calling_codes?.[0]
              ? `+${countryData.calling_codes[0]}`
              : '',
            cca2: countryData.codes.alpha_2,
          }))
          .filter((countryData) => countryData.code)
          .sort((first, second) => first.name.localeCompare(second.name));

        setCountries(formattedCountries);
      } catch (error) {
        console.error('Error fetching country codes:', error);
        toast.error('Could not load country codes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading };
};
