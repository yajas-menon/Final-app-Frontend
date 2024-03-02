import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userData",
  initialState: {
    name: "",
    email: "",
    role: "",
    questions: "",
  },
  reducers: {
    updateUser: (state, action) => {
      if (action.payload.name) {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.questions = action.payload.questions;
      }
    },
    clearUser: (state) => {
      state = {
        name: "",
        email: "",
        role: "",
        questions: "",
      };
    },
  },
});

// Export action creators
export const { updateUser, clearUser } = userSlice.actions;

// Export reducer function
export default userSlice.reducer;
