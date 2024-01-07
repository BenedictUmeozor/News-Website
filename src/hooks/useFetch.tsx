import { useState } from "react";

const useFetch = (keywords?: string, limit?: number, offset?: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = async () => {
    let url: string = `http://api.mediastack.com/v1/news?access_key=${
      import.meta.env.VITE_API_KEY
    }`;

    if (keywords) {
      url = url + `&keywords=${keywords}`;
    }

    if (limit && limit > 0) {
      url = url + `&limit=${limit}`;
    }

    if (offset && offset > 0) {
      url = url + `&offset=${offset}`;
    }

    try {
      setIsLoading(true);
      setError(false);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { request, isLoading, error };
};

export default useFetch;
