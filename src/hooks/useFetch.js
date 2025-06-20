import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import logOutFunction from "../utils/logOutFunction";
import { EMAIL_VERIFICATION, TOO_MANY_REQUESTS } from "../routes";

const useFetch = () => {
  const [data, setData] = useState({ status: "idle", data: null });
  const dispatch = useDispatch();
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
          logOutFunction(dispatch, navigate);
        } else if (err.status === 403 && err.response?.data?.message.startsWith("Your email is not verified")) {
          navigate(EMAIL_VERIFICATION);
        } else if (err.status === 403) {
          logOutFunction(dispatch, navigate);
        } else if (err.status === 429) {
          navigate(TOO_MANY_REQUESTS);
        }
      }
    },
    [dispatch, navigate]
  );

  return { data, fetchData };
};

export default useFetch;
