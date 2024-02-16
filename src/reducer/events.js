import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  categoryDel: false,
  categoryEdit: false,
  categoryCreate: false,
};
export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    CategoryDeleteModal: (state, actions) => {
      state.categoryDel = !state.categoryDel;
    },
    CategoryEditModal: (state, actions) => {
      state.categoryEdit = !state.categoryEdit;
    },
  },
});

export const { CategoryDeleteModal, CategoryEditModal } = eventsSlice.actions;
export default eventsSlice.reducer;
