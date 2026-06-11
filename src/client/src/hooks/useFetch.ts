import { useState, useEffect, useRef } from "react";

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}


export function useFetch<T = unknown>(url: string, options: RequestInit = {}): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const optionsRef = useRef(options);

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          ...optionsRef.current,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} — ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type") ?? "";
        const parsed: T = contentType.includes("application/json")
          ? await response.json()
          : await response.text();

        setData(parsed);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    run();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
