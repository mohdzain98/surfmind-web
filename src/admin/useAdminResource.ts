import { useCallback, useEffect, useState } from "react";
import { AdminApiError } from "./api";
import { useAdminAuth } from "./adminAuth";

export function useAdminResource<T>(path: string) {
  const { request } = useAdminAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setData(await request<T>(path));
    } catch (requestError) {
      setError(
        requestError instanceof AdminApiError
          ? requestError.message
          : "The admin service could not be reached."
      );
    } finally {
      setLoading(false);
    }
  }, [path, request]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { data, loading, error, reload };
}
