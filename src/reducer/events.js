import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  categoryDel: false,
  deleteCategoryId:'',
  categoryEdit: false,
  editCategoryId:'',
  categoryCreate: false,
  createCategoryId:''
};
export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    CategoryDeleteModal: (state, action) => {
      state.categoryDel = !state.categoryDel;
      state.deleteCategoryId=action.payload
    },
    CategoryEditModal: (state, action) => {
      state.categoryEdit = !state.categoryEdit;
      state.editCategoryId = action.payload;
    },
    CategoryCreateModal: (state, action) => {
      state.categoryCreate = !state.categoryCreate;
      state.createCategoryId = action.payload;
    },
  },
});

export const { CategoryDeleteModal, CategoryEditModal, CategoryCreateModal } =
  eventsSlice.actions;
export default eventsSlice.reducer;
