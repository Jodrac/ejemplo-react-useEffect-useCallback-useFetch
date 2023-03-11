import { useState, useEffect, useCallback } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("useFetch");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw Error("Error al consumir la api");

      const data = await res.json();
      setData(data);
    } catch (error) {
      setError(error.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    console.log("useEffect");

    fetchData();
  }, []);
  return { data: data, loading: loading, error: error };
};
