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
  revalidate: () => Promise<void>;
}

export const useFetcher = () => {
  const Fetcher = async <T>({
    url,
    method,
    headers,
    params,
    data,
  }: RequestConfig<T>): Promise<T> => {
    try {
      const response = await axios({
        url: `/api/routes/${url}`,
        data: data,
        method: method,
        headers: headers,
        params: params,
      });
      return response.data;
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  };

  function POST<T>({ url, data }: RequestConfig<T>) {
    (async () => {
      const response = await Fetcher<T>({
        url: url,
        method: "POST",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
    })();
  }

  const GET = <T>({ url }: RequestConfig<T>): FetchReturn<T> => {
    const [fetchedData, setFetchedData] = React.useState<T | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    const revalidate = React.useCallback(async () => {
      try {
        setIsLoading(true);
        const response = await Fetcher<T>({
          url: url,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setFetchedData(response);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);

        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }, [url]);

    useEffect(() => {
      revalidate();
    }, [revalidate]);

    return { data: fetchedData, isLoading, error, revalidate };
  };

  const DELETE = <T>(props: RequestConfig<T>) => {
    (async () => {
      const response = await Fetcher<T>({
        url: props.url,
        method: "DELETE",
        params: props.params,
        headers: props.headers,
      });
    })();
  };

  return { POST, GET, DELETE };
};
