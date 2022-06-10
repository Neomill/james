import { PORequestProps } from "@/components/PORequest/PORequestDetails";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  id: 1,
};

const poRequestSlice = createSlice({
  name: "poRequestSlice",
  initialState,
  reducers: {
    addVirtualPOR: (state, action: PayloadAction<PORequestProps>) => {
      const alreadyExists = state.data.some(
        (data) => data.request_no === action.payload.request_no
      );
      if (!alreadyExists) {
        state.data = [...state.data, { id: state.id, ...action.payload }];
        state.id++;
      }
      return state;
    },
    removeVirtualPOR: (state, action) => {
      state.data = state.data.filter((data) => data.id !== action.payload);
      return state;
    },
    editVirtualPOR: (
      state,
      action: PayloadAction<{ id: number; data: {} }>
    ) => {
      const updatedItems = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload.data };
        }
        return item;
      });
      state.data = updatedItems;
    },
    resetPORState: (state) => {
      return initialState;
    },
  },
});

export const {
  addVirtualPOR,
  removeVirtualPOR,
  editVirtualPOR,
  resetPORState,
} = poRequestSlice.actions;

export default poRequestSlice.reducer;
