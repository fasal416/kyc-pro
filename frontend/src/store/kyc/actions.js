export const FETCH_SUBMISSIONS_SUCCESS = "kyc/fetchSubmissionsSuccess";
export const UPDATE_STATUS = "kyc/updateStatus";

export const fetchSubmissionsSuccess = (submissions) => ({
  type: FETCH_SUBMISSIONS_SUCCESS,
  payload: submissions,
});

export const updateStatus = (id, status) => ({
  type: UPDATE_STATUS,
  payload: { id, status },
});
