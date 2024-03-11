import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    bookLoader: false,
    BookResponse: {},
    searchString: "",
    filterObject: {},
    selectedRecord: {},
  },
  reducers: {
    getBookResponse: (state, action) => {
      console.log("getBookResponse test3");
      state.BookResponse = action.payload;
    },
    getbookLoader: (state, action) => {
      state.bookLoader = action.payload;
    },
    getsearchString: (state, action) => {
      state.searchString = action.payload;
    },
    getfilterObject: (state, action) => {
      state.filterObject = action.payload;
    },
    getSelectedRecord: (state, action) => {
      state.selectedRecord = action.payload;
    },
  },
});

export const {
  getbookLoader,
  getBookResponse,
  getfilterObject,
  getsearchString,
  getSelectedRecord,
} = bookSlice.actions;

export default bookSlice.reducer;
