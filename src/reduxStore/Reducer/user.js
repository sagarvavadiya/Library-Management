import { createSlice } from "@reduxjs/toolkit";

let userDataObject;

if (localStorage.getItem("UserInfo")) {
  if (JSON.parse(localStorage.getItem("UserInfo"))) {
    userDataObject = JSON.parse(localStorage.getItem("UserInfo"));
  } else {
    userDataObject = {};
  }
} else {
  userDataObject = {};
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userListLoader: false,
    userListResponse: {},
    searchString: "",
    filterObject: {},
    selectedRecord: {},
    userData: userDataObject ?? {},
    usertransactionData: {},
    adminDashboardData: {},
    IsAdmin:
      (userDataObject && `${userDataObject.role}`.toLowerCase() === `admin`) ??
      false,
  },
  reducers: {
    getUserListResponse: (state, action) => {
      state.userListResponse = action.payload;
    },
    getUserListLoader: (state, action) => {
      state.userListLoader = action.payload;
    },
    userLogin: (state, action) => {
      state.userData = action.payload;
      state.IsAdmin =
        (action.payload &&
          `${action.payload.role}`.toLowerCase() === `admin`) ??
        false;
    },
    getUsertransactionData: (state, action) => {
      state.usertransactionData = action.payload;
    },
    getAdminDashboardData: (state, action) => {
      state.adminDashboardData = action.payload;
    },
  },
});

export const {
  getUsertransactionData,
  getAdminDashboardData,
  getUserListResponse,
  getUserListLoader,
  userLogin,
} = userSlice.actions;

export default userSlice.reducer;
