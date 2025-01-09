import { useState } from "react";

function useFetch<T, Args extends unknown[]>(
  cb: (...args: Args) => Promise<T>
) {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<undefined | unknown>();

  const fn = async (...args: Args) => {
    try {
      setLoading(true);
      const result = await cb(...args);
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {loading, error, data, fn};
}

export default useFetch;
