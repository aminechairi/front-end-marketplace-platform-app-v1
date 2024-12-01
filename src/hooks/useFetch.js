import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

import cookieManager from "../utils/cookieManager";
import { LOGIN, EMAIL_VERIFICATION, TOO_MANY_REQUESTS } from "../routes";

const useFetch = () => {
  const [data, setData] = useState({ status: "idle", data: null });
  const navigate = useNavigate();

  const fetchData = useCallback(
    async ({
      url,
      method = "get",
      params = {},
      data: bodyData = {},
      headers = {},
    }) => {
      setData({ status: "loading", data: null });

      try {
        const response = await axios({
          url,
          method,
          params,
          data: bodyData,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        });

        setData({ status: "succeeded", data: response.data });
      } catch (err) {

        if (err.response?.data) {
          setData({
            status: "succeeded",
            data: err.response.data,
          });
        } else {
          setData({
            status: "failed",
            data: null,
          });
        }

        if (err.status === 401) {
          cookieManager("delete", "JWTToken");
          navigate(LOGIN);
        }
        if (err.status === 403) {
          navigate(EMAIL_VERIFICATION);
        }
        if (err.status === 429) {
          navigate(TOO_MANY_REQUESTS);
        }
      }
    },
    [navigate]
  );

  return { data, fetchData };
};

export default useFetch;
