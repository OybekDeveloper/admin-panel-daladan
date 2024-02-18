import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  categoryDel: false,
  deleteCategoryId: "",
  categoryEdit: false,
  editCategoryId: "",
  defaultEditCategory: "",
  categoryCreate: false,
  departmentDel: false,
  deleteDepartmentId: '',
  departmentCreate: false,
  selectCategory: [],
};
export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    CategoryDeleteModal: (state, action) => {
      state.categoryDel = !state.categoryDel;
      state.deleteCategoryId = action.payload;
    },
    CategoryEditModal: (state, action) => {
      console.log(action);
      state.categoryEdit = !state.categoryEdit;
      if (action.payload) {
        state.editCategoryId = action?.payload[0];
        const filterData = action?.payload[1].filter(
          (item) => item?.id === action?.payload[0]
        );
        state.defaultEditCategory = filterData;
      }
    },
    CategoryCreateModal: (state) => {
      state.categoryCreate = !state.categoryCreate;
    },
    DepartmentCreateModal: (state) => {
      state.departmentCreate = !state.departmentCreate;
    },
    SelectCategory: (state, action) => {
      if (action.payload) {
        const newData = action.payload.map((item) => {
          return { id: item?.id, name: item?.name, check: false };
        });
        state.selectCategory = newData;
      }
    },
    DepartmentDeleteModal: (state, action) => {
      state.departmentDel = !state.departmentDel;
      state.deleteDepartmentId = action.payload;
    }
  },
});

export const {
  CategoryDeleteModal,
  CategoryEditModal,
  CategoryCreateModal,
  DepartmentCreateModal,
  SelectCategory,
  DepartmentDeleteModal,
} = eventsSlice.actions;
export default eventsSlice.reducer;
