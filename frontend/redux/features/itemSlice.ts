import { ItemProps } from "@/components/Inventory/ItemDetails";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  id: 1,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemProps>) => {
      const alreadyExists = state.data.some(
        (data) => data.name === action.payload.name
      );
      if (!alreadyExists) {
        state.data = [...state.data, { id: state.id, ...action.payload }];
        state.id++;
      }
      return state;
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((data) => data.id !== action.payload);
      return state;
    },
    editVirtualItem: (
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
    resetItemState: (state) => {
      return initialState;
    },
  },
});

export const { addItem, editVirtualItem, removeItem, resetItemState } =
  itemSlice.actions;

export default itemSlice.reducer;
