import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  //universal state
  modalDel: false,
  modalEdit: false,
  modalCreate: false,
  deleteModalId: "",
  editModalId: "",
  defaultEditDepartment: "",
  selectCategory: [],
  //news state
  openAllNews: false,
  selectNews: [],
  selectNewsId: "",
  //faq state
  openSelectFaq: false,
  selectFaq: [],
  defaultEdit: [],
};
export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    //universal modals
    DeleteModalData: (state, action) => {
      state.modalDel = !state.modalDel;
      if (action.payload) {
        state.deleteModalId = action.payload;
      }
    },
    EditModalData: (state, action) => {
      state.modalEdit = !state.modalEdit;
      if (action.payload) {
        state.editModalId = action?.payload[0];
        const filterData = action?.payload[1].filter(
          (item) => item?.id === action?.payload[0]
        );
        state.defaultEditCategory = filterData;
        state.defaultEditDepartment = filterData;
      }
    },
    CreateModalData: (state, action) => {
      state.modalCreate = !state.modalCreate;
    },
    //sub-category modals
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
    //faqs modal
    ShowSelectFaq: (state, action) => {
      state.openSelectFaq = !state.openSelectFaq;
      state.selectFaq = action.payload;
    },
  },
});

export const {
  DeleteModalData,
  EditModalData,
  CreateModalData,
  ShowSelectFaq,
  SelectCategory,
  ShowSelectNews,
  ShowreateModal,
} = eventsSlice.actions;
export default eventsSlice.reducer;
