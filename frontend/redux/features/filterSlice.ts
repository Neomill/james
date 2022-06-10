import { createSlice } from "@reduxjs/toolkit";

export const toggle = (array: Array<any>, value: any) => {
  var index = array.indexOf(value);
  if (index === -1) {
    array.push(value);
  } else {
    array.splice(index, 1);
  }
  return array;
};

const initialState: {
  filters: any;
  sortBy: any;
} = {
  filters: {},
  sortBy: {},
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters: (state, { payload }) => {
      state.filters = {
        ...state.filters,
        [payload.selector]: payload.value,
      };
      return state;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSort: (state, { payload }) => {
      state.sortBy = {
        [payload.selector]: payload.value,
      };
      return state;
    },
    resetSort: (state) => {
      state.sortBy = initialState.sortBy;
    },
  },
});

export const { setFilters, resetFilters, setSort, resetSort } =
  filterSlice.actions;

export default filterSlice.reducer;
