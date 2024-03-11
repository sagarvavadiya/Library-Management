import { USER } from "../../helpers/apiConstant";
import {
  GET_API,
  ToastError,
  ToastSuccess,
} from "../../helpers/functionHelper";
import {
  getAdminDashboardData,
  getUserListLoader,
  getUserListResponse,
  getUsertransactionData,
  userLogin,
} from "../Reducer/user";

export const StoreUserApiResponce = () => (dispatch) => {
  console.log("StoreBookApiResponce test1");
  dispatch(getUserListLoader(true));
  GET_API(USER)
    .then((response) => {
      dispatch(getUserListResponse(response));
      dispatch(getUserListLoader(false));
    })
    .catch((error) => {
      ToastError(error);
      dispatch(getUserListLoader(false));
    });
};

export const StoreLoginUserData = (data) => (dispatch) => {
  dispatch(userLogin(data));
  // eslint-disable-next-line no-restricted-globals
  window.location.reload();
  return null;
};
export const StoreUsertransactionData = (data) => (dispatch) => {
  dispatch(getUsertransactionData(data));
  return null;
};
export const StoreAdminDashboardData = (data) => (dispatch) => {
  dispatch(getAdminDashboardData(data));
  return null;
};
