import axios from "axios";
import { GET_ERRORS } from "./types";

export const createBooking = (booking, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/makebooking/create", booking);
    history.push("/homepage");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
