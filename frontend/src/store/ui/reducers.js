import { initialState } from "./state";
import { SET_LOADING, SET_ERROR, SET_NOTIFICATION } from "./actions";

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_NOTIFICATION:
      return { ...state, notification: action.payload };
    default:
      return state;
  }
};

export default uiReducer;
