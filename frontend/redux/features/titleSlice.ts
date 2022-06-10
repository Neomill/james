import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  title: "Shydan",
};

const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    changeTitle: (state, action: PayloadAction<any>) => {
      state.title = action.payload;
      return state;
    },
    resetTitle: (state, action) => {
      return initialState;
    },
  },
});

export const { changeTitle, resetTitle } = titleSlice.actions;

export default titleSlice.reducer;
