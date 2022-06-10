import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InvoiceOrderProps {
  qty: number;
  menu_item_id: number | string;
  name: string;
  price: number;
}

interface InvoiceStateProps {
  orders: InvoiceOrderProps[];
  totalPrice: number;
}

const initialState: InvoiceStateProps = {
  orders: [],
  totalPrice: 0,
};

const itemSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addInvoiceMenuItem: (
      state: InvoiceStateProps,
      action: PayloadAction<InvoiceOrderProps>
    ) => {
      const alreadyExists = state.orders.some(
        (data) => data.menu_item_id === action.payload.menu_item_id
      );
      if (!alreadyExists) {
        state.orders = [...state.orders, action.payload];
        state.totalPrice += action.payload.price * action.payload.qty;
      }
      return state;
    },
    resetInvoiceState: (state) => {
      return initialState;
    },
  },
});

export const { addInvoiceMenuItem, resetInvoiceState } = itemSlice.actions;

export default itemSlice.reducer;
