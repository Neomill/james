import { EquipmentItemProps } from "@/components/EquipmentItems/EquipmentItemDetails";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  id: 1,
};

const equipmentItemSlice = createSlice({
  name: "equipmentItem",
  initialState,
  reducers: {
    addEquipmentItem: (state, action: PayloadAction<EquipmentItemProps>) => {
      const alreadyExists = state.data.some(
        (data) => data.name === action.payload.name
      );
      if (!alreadyExists) {
        state.data = [...state.data, { id: state.id, ...action.payload }];
        state.id++;
      }
      return state;
    },
    removeEquipmentItem: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((data) => data.id !== action.payload);
      return state;
    },
    editVirtualEquipmentItem: (
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
    resetEquipmentItemState: (state) => {
      return initialState;
    },
  },
});

export const {
  addEquipmentItem,
  editVirtualEquipmentItem,
  removeEquipmentItem,
  resetEquipmentItemState,
} = equipmentItemSlice.actions;

export default equipmentItemSlice.reducer;
