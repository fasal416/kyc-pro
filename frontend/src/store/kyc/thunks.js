import { fetchSubmissionsSuccess } from "./actions";
import { setLoading, setError } from "../ui/actions";

export const fetchSubmissions = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch("/api/kyc/submissions");
    const data = await response.json();
    dispatch(fetchSubmissionsSuccess(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
