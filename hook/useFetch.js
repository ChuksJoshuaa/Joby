import axios from "axios";
import { useState, useEffect } from "react";
import Constants from "expo-constants";
import { RAPID_API_HOST, RAPID_API_KEY } from "@env";

const useFetch = (endpoint, query) => {
  const rapidApiKey = RAPID_API_KEY;
  const rapidApiHost = RAPID_API_HOST;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": rapidApiHost,
    },
    url: `https://${rapidApiHost}/${endpoint}`,
    params: {
      ...query,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const resp = await axios.request(options);
      setData(resp.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { isLoading, error, refetch, data };
};

export default useFetch;
