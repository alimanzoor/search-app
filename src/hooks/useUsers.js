import { useMemo, useCallback, useState, useContext, useEffect } from "react";
import axios from "axios";
import { endpoints } from "../config";
import StateContext from "../context/StateContext";
import {
  USERS_FETCHED,
  USERS_SET_NEXT,
  USERS_SET_PREVIOUS,
} from "../context/constant.types";
import DispatchContext from "../context/DispatchContext";

export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { fetchDetail, users } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const fetchUsers = useCallback(
    async (page) => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(
          `${endpoints.usersWithSeed}&results=${fetchDetail.results}&page=${page}`
        );
        // console.log("response", response);
        if (response.status === 200 && response.data) {
          dispatch({ type: USERS_FETCHED, payload: response.data });
          return;
        }

        // if status is not 200
        setError(true);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, fetchDetail]
  );

  useEffect(() => {
    if (fetchDetail.currentPage === 0 && !error) {
      fetchUsers(fetchDetail.currentPage + 1);
    }
  }, [fetchUsers, fetchDetail, error]);

  const handleClickNext = useCallback(() => {
    if (users && users.length > fetchDetail.currentPage) {
      dispatch({ type: USERS_SET_NEXT });
    } else {
      fetchUsers(fetchDetail.currentPage + 1);
    }
  }, [fetchUsers, fetchDetail, dispatch, users]);

  const handleClickPrev = useCallback(() => {
    dispatch({ type: USERS_SET_PREVIOUS });
  }, [dispatch]);

  const paginationRange = useMemo(() => {
    return {
      error,
      loading,
      handleClickNext,
      handleClickPrev,
    };
  }, [loading, error, handleClickNext, handleClickPrev]);

  return paginationRange;
};
