import { initialState } from "./state";
import { FETCH_SUBMISSIONS_SUCCESS, UPDATE_STATUS } from "./actions";

const kycReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBMISSIONS_SUCCESS:
      return { ...state, submissions: action.payload };
    case UPDATE_STATUS:
      return {
        ...state,
        submissions: state.submissions.map((submission) =>
          submission.id === action.payload.id
            ? { ...submission, status: action.payload.status }
            : submission
        ),
      };
    default:
      return state;
  }
};

export default kycReducer;
