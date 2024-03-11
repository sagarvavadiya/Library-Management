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
