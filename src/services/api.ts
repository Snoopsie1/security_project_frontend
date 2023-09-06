import axios, { AxiosPromise } from "axios";
import React, { useEffect } from "react";

interface RequestConfig<T> {
  url: string;
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "DELETE" | "PUT";
  params?: Record<string, string>;
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
    params,
    data,
  }: RequestConfig<T>): Promise<T> => {
    const response = await axios({
      url: `/api/routes/${url}`,
      method,
      headers,
      params,
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
    }, [url]);

    return { data: fetchedData, isLoading, error };
  };

  const DELETE = <T>(props: RequestConfig<T>) => {
    console.log(props.url);
    (async () => {
      const response = await Fetcher<T>({
        url: props.url,
        method: "DELETE",
        params: props.params,
        headers: props.headers,
      });
      console.log(response);
    })();
  };

  return { POST, GET, DELETE };
};