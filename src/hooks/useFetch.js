import { useState, useCallback } from "react";

import API from "../config/api";

const useFetch = () => {
  const [data, setData] = useState({ status: "idle", data: null });

  const fetchData = useCallback(
    async ({ url, method = "get", params = {}, data: bodyData = {} }) => {
      setData({ status: "loading", data: null });

      try {
        const response = await API({
          url,
          method,
          params,
          data: bodyData,
        });

        setData({ status: "succeeded", data: response.data });
      } catch (err) {
        setData({
          status: "failed",
          data: err.response?.data,
        });
      }
    },
    []
  );

  return { data, fetchData };
};

export default useFetch;
