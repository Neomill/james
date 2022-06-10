import { MenuItemProps } from "@/components/MenuItem/MenuItemDetails";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  id: 1,
};

const menuItemSlice = createSlice({
  name: "menuItem",
  initialState,
  reducers: {
    addMenuItem: (state, action: PayloadAction<MenuItemProps>) => {
      const alreadyExists = state.data.some(
        (data) => data.name === action.payload.name
      );
      if (!alreadyExists) {
        state.data = [...state.data, { id: state.id, ...action.payload }];
        state.id++;
      }
      return state;
    },
    removeMenuItem: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((data) => data.id !== action.payload);
      return state;
    },
    editVirtualMenuItem: (
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
    resetMenuItemState: (state) => {
      return initialState;
    },
  },
});

export const {
  addMenuItem,
  editVirtualMenuItem,
  removeMenuItem,
  resetMenuItemState,
} = menuItemSlice.actions;

export default menuItemSlice.reducer;
