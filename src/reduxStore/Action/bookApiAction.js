import { BOOK } from "../../helpers/apiConstant";
import {
  GET_API,
  ToastError,
  ToastSuccess,
} from "../../helpers/functionHelper";
import {
  getBookResponse,
  getSelectedRecord,
  getbookLoader,
  getfilterObject,
  getsearchString,
} from "../Reducer/book";
import { increment } from "../Reducer/counterSlice";

export const ApiCall = (params) => (dispatch) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "DEMO-API-KEY",
  });
  // return "$&{"result"}"
  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  fetch(
    "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1",
    requestOptions
  )
    //   .then(response => response.text())
    .then((result) => result.json())
    .then((response) => {
      console.log("result", response[0].height);
      dispatch(increment(response[0].height));
    })
    .catch((error) => console.log("error", error));
};

export const StoreBookApiResponce = () => (dispatch) => {
  console.log("StoreBookApiResponce test1");
  dispatch(getbookLoader(true));
  GET_API(BOOK)
    .then((response) => {
      dispatch(getBookResponse(response));
      dispatch(getbookLoader(false));
    })
    .catch((error) => {
      ToastError(error);
      dispatch(getbookLoader(false));
    });
};

export const StoreSearchFilterValue =
  ({ type, data }) =>
  (dispatch) => {
    if (type == "filter") {
      dispatch(getfilterObject(data));
    } else {
      dispatch(getsearchString(data));
    }

    return null;
  };

export const StoreSelectedRecord = (data) => (dispatch) => {
  console.log("StoreSelectedRecord object");
  dispatch(getSelectedRecord(data));
  return null;
};
