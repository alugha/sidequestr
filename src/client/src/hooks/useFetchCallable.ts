import { useState, useEffect, useRef, useCallback } from "react";

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  call(overwriteOptions?: RequestInit): Promise<T | null>;
}


export function useFetchCallable<T = unknown>(url: string, options: RequestInit = {}): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signal = useRef<AbortSignal>(undefined)

  useEffect(() => {
    const ctrl = new AbortController();
    signal.current = ctrl.signal;
    return () => {
      ctrl.abort();
    }
  }, [])

  const optionsRef = useRef(options);

  const call = useCallback(async (overwriteOptions?: RequestInit): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...optionsRef.current,
        ...overwriteOptions,
        signal: signal.current,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} — ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type") ?? "";
      const parsed: T = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      setData(parsed);
      return parsed;
    } catch (err) {
      if (!signal.current?.aborted) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
      return null;
    } finally {
      if (!signal.current?.aborted) {
        setLoading(false);
      }
    }
  }, [url]);

  return { data, loading, error, call };
}
