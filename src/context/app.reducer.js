import {
  USERS_FETCHED,
  USERS_SET_NEXT,
  USERS_SET_PREVIOUS,
  USER_RESET_SELECTED,
  USER_SELECTED,
} from "./constant.types";

export const initialAppState = {
  users: null,
  selectedUser: null,
  fetchDetail: {
    currentPage: 0,
    results: 10,
  },
};
export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case USERS_FETCHED:
      return {
        ...state,
        fetchDetail: {
          currentPage: action.payload.info.page,
          results: action.payload.info.results,
        },
        users: state.users
          ? [...state.users, action.payload]
          : [action.payload],
      };
    case USER_SELECTED:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case USER_RESET_SELECTED:
      return {
        ...state,
        selectedUser: null,
      };
    case USERS_SET_NEXT:
      return {
        ...state,
        fetchDetail: {
          ...state.fetchDetail,
          currentPage: state.fetchDetail.currentPage + 1,
        },
      };
    case USERS_SET_PREVIOUS:
      return {
        ...state,
        fetchDetail: {
          ...state.fetchDetail,
          currentPage: state.fetchDetail.currentPage - 1,
        },
      };
    default:
      return state;
  }
};
