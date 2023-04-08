import axios from "axios";
import { useState, useEffect } from "react";
import { RAPID_API_HOST, RAPID_API_KEY } from "@env";

const useFetch = (endpoint, query) => {
  const rapidApiKey = RAPID_API_KEY;
  const rapidApiHost = RAPID_API_HOST;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": rapidApiHost,
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
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
      setIsError(true);
      setError("An error has occurred");
      console.log(error);
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

  return { isLoading, error, refetch, data, isError };
};

export default useFetch;
