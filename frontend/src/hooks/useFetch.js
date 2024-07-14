import { useState } from "react";
import { api } from "../utilities/api";

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async ({ method = "GET", url = "", data = {}, cb = null }) => {
    try {
      setIsLoading(true);

      const response = await api({
        method: method,
        url: url,
        data: data,
      });

      if (response.status === 200) {
        if (cb) {
          cb(response.data);
        }
      }
    } catch (error) {
      if (error.response) {
        if (cb) {
          cb(error.response.data);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetch,
    isLoading,
  };
};
