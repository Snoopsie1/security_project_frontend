import axios, { AxiosPromise } from "axios";
import React, { useEffect } from "react";

interface RequestConfig<T> {
  url: string;
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "DELETE" | "PUT";
  data?: T | null;
}

interface FetchReturn<T> {
  data: T | null;
  isLoading?: boolean;
  error?: string | null;
}

export const useFetcher = () => {
  const Fetcher = async <T>({
    url,
    method,
    headers,
    data,
  }: RequestConfig<T>): Promise<T> => {
    const response = await axios({
      url: `http://localhost/api/routes/${url}`,
      method,
      headers,
      data,
    });
    return response.data;
  };

  function POST<T>({ url, data }: RequestConfig<T>): FetchReturn<T> {
    const [fetchedData, setFetchedData] = React.useState<T | null>(null);
    (async () => {
      const response = await Fetcher<T>({
        url: url,
        method: "POST",
        data: data,
      });
      setFetchedData(response);
    })();

    return { data: fetchedData };
  }

  const GET = <T>({ url }: RequestConfig<T>): FetchReturn<T> => {
    const [fetchedData, setFetchedData] = React.useState<T | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
      (async () => {
        try {
          setIsLoading(true);
          const response = await Fetcher<T>({ url: url, method: "GET" });
          setFetchedData(response);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);

          if (err instanceof Error) {
            setError(err.message);
          }
        }
      })();
    }, []);

    return { data: fetchedData, isLoading, error };
  };

  const DELETE = <T>({ url, data }: RequestConfig<T>): FetchReturn<T> => {
    const [fetchedData, setFetchedData] = React.useState<T | null>(null);
    (async () => {
      const response = await Fetcher<T>({
        url: url,
        data: data,
        method: "DELETE",
      });
      setFetchedData(response);
    })();
    return { data: fetchedData };
  };

  return { POST, GET, DELETE };
};
