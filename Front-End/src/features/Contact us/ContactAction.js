// src/redux/contactActions.js
import axios from "axios";

export const submitContactFormStart = () => ({
  type: "contact/submitFormStart",
});

export const submitContactFormSuccess = (formData) => ({
  type: "contact/submitFormSuccess",
  payload: formData,
});

export const submitContactFormFailure = (error) => ({
  type: "contact/submitFormFailure",
  payload: error,
});

export const resetContactForm = () => ({
  type: "contact/resetForm",
});

// Thunk action creator
export const submitContactForm = (formData) => async (dispatch) => {
  dispatch(submitContactFormStart());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/contact/",
      formData
    );

    if (response.status !== 200) {
      throw new Error("Failed to submit form");
    }

    dispatch(submitContactFormSuccess(response.data));
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      dispatch(
        submitContactFormFailure(error.response.data.message || "Server error")
      );
    } else if (error.request) {
      // The request was made but no response was received
      dispatch(submitContactFormFailure("No response from server"));
    } else {
      // Something happened in setting up the request that triggered an Error
      dispatch(submitContactFormFailure(error.message));
    }
  }
};
