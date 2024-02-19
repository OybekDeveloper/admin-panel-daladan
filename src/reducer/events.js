import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  //category state
  categoryDel: false,
  deleteCategoryId: "",
  categoryEdit: false,
  editCategoryId: "",
  defaultEditCategory: "",
  categoryCreate: false,
  //department state
  departmentDel: false,
  deleteDepartmentId: "",
  departmentEdit: false,
  editDepartmentId: "",
  defaultEditDepartment: "",
  departmentCreate: false,
  selectCategory: [],
  //news state
  openAllNews: false,
  selectNews: [],
  selectNewsId: "",
  newsCreate: false,
  //banner state
  bannerCreate: false,
  bannerDel: false,
  //faq state
  openSelectFaq: false,
  selectFaq: [],
  faqCreate: false,
  deleteFaqId: "",
  faqDel: false,
  faqEdit: false,
  editFaqId: "",
  defaultEdit:[]
};
export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    //category modals
    CategoryDeleteModal: (state, action) => {
      state.categoryDel = !state.categoryDel;
      state.deleteCategoryId = action.payload;
    },
    CategoryEditModal: (state, action) => {
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
    //sub-category modals
    DepartmentCreateModal: (state) => {
      state.departmentCreate = !state.departmentCreate;
    },
    DepartmentDeleteModal: (state, action) => {
      state.departmentDel = !state.departmentDel;
      state.deleteDepartmentId = action.payload;
    },
    DepartmentEditModal: (state, action) => {
      state.departmentEdit = !state.departmentEdit;
      if (action.payload) {
        state.editDepartmentId = action?.payload[0];
        const filterData = action?.payload[1].filter(
          (item) => item?.id === action?.payload[0]
        );
        state.defaultEditDepartment = filterData;
      }
    },
    SelectCategory: (state, action) => {
      if (action.payload) {
        const newData = action.payload.map((item) => {
          return { id: item?.id, name: item?.name, check: false };
        });
        state.selectCategory = newData;
      }
    },
    //news modals
    NewsCreateModal: (state, action) => {
      state.newsCreate = !state.newsCreate;
    },
    ShowSelectNews: (state, action) => {
      state.openAllNews = !state.openAllNews;
       if (action.payload) {
         const filterData = action?.payload[1].filter(
           (item) => item?.id === action?.payload[0]
         );
         state.selectNews = filterData;
       }
    },
    //banner modals
    BannerCreateModal: (state, action) => {
      state.bannerCreate=!state.bannerCreate
    },
    BannerDeleteModal: (state, action) => {
      state.bannerDel = !state.bannerDel;
      state.deleteBannerId = action.payload;
    },
    //faqs modal
    ShowSelectFaq: (state, action) => {
     state.openSelectFaq = !state.openSelectFaq;
       state.selectFaq = action.payload;
    },
    FaqCreateModal: (state, action) => {
      state.faqCreate = !state.faqCreate;
    },
    FaqDeleteModal: (state, action) => {
      state.faqDel = !state.faqDel;
      state.deleteFaqId=action.payload
    },
    FaqEditModal: (state, action) => {
      state.faqEdit = !state.faqEdit;
      if (action.payload) {
        state.editFaqId=action.payload[0]
        state.defaultEdit=action.payload[1]
      }
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
  DepartmentEditModal,
  NewsCreateModal,
  ShowSelectNews,
  BannerCreateModal,
  BannerDeleteModal,
  ShowSelectFaq,
  FaqCreateModal,
  FaqDeleteModal,
  FaqEditModal,
} = eventsSlice.actions;
export default eventsSlice.reducer;
