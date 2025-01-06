export const SET_LOADING = "ui/setLoading";
export const SET_ERROR = "ui/setError";
export const SET_NOTIFICATION = "ui/setNotification";

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});
export const setError = (error) => ({ type: SET_ERROR, payload: error });
export const setNotification = (notification) => ({
  type: SET_NOTIFICATION,
  payload: notification,
});
