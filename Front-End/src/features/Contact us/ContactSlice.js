// src/redux/contactSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    name: "",
    email: "",
    message: "",
  },
  isSubmitting: false,
  isSubmitted: false,
  error: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    submitFormStart: (state) => {
      state.isSubmitting = true;
      state.error = null;
    },
    submitFormSuccess: (state, action) => {
      state.formData = action.payload;
      state.isSubmitting = false;
      state.isSubmitted = true;
      state.error = null;
    },
    submitFormFailure: (state, action) => {
      state.isSubmitting = false;
      state.error = action.payload;
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const {
  submitFormStart,
  submitFormSuccess,
  submitFormFailure,
  resetForm,
} = contactSlice.actions;
export default contactSlice.reducer;
