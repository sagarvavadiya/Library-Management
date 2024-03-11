import axios from "axios";
import { toast } from "react-toastify";
import { authToken, baseUrl } from "./generalConstant";
import * as ReactIcons from "react-icons/ai";

export const ToastError = (error) => {
  error?.response?.data?.message?.query || error?.response?.data?.message?.level
    ? toast.error(error?.message)
    : error?.response?.data?.message
    ? toast.error(error?.response?.data?.message)
    : error?.message
    ? toast.error(error?.message)
    : error
    ? toast.error(error)
    : toast.error("Server Error");
  return null;
};

export const ToastSuccess = (response) => {
  response?.data?.data?.message
    ? toast.success(response?.data?.message)
    : response?.data?.message
    ? toast.success(response?.data?.message)
    : response?.message
    ? toast.success(response?.message)
    : response?.message
    ? toast.success(response?.message)
    : toast.success("Api call successfuly");

  return null;
};

export const ToastWarning = (warning) => {
  warning?.response?.data?.message.query ||
  warning?.response?.data?.message?.level
    ? toast.warning(warning?.message)
    : warning?.response?.data?.message
    ? toast.warning(warning?.response?.data?.message)
    : warning?.message
    ? toast.warning(warning?.message)
    : warning
    ? toast.warning(warning)
    : toast.warning("Something going wrong");
  return null;
};

const HEADERS = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${authToken}`,
    // Include any other required headers
  },
};

export const POST_LOGIN_API = ({ endPoint, body }) => {
  return new Promise((Response, Reject) => {
    axios
      .post(`${baseUrl}/${endPoint}`, body)
      .then((res) => {
        Response(res);
      })
      .catch((error) => {
        Reject(error);
      });
  });
};

export const POST_API = ({ endPoint, body }) => {
  return new Promise((Response, Reject) => {
    axios
      .post(`${baseUrl}/${endPoint}`, body, HEADERS)
      .then((res) => {
        Response(res);
      })
      .catch((error) => {
        Reject(error);
      });
  });
};

export const PUT_API = ({ endPoint, body }) => {
  // const bodyFormData = new FormData();
  // Object.keys(body).map((i) => {
  //   bodyFormData.append(i, body[i]);
  // });

  return new Promise((Response, Reject) => {
    axios
      .put(`${baseUrl}/${endPoint}`, body, HEADERS)
      .then((res) => {
        Response(res);
      })
      .catch((error) => {
        Reject(error);
      });
  });
};

export const DELETE_API = ({ endPoint, body }) => {
  // const bodyFormData = new FormData();
  // Object.keys(body).map((i) => {
  //   bodyFormData.append(i, body[i]);
  // });

  return new Promise((Response, Reject) => {
    axios
      .delete(`${baseUrl}/${endPoint}`, HEADERS)
      .then((res) => {
        Response(res);
      })
      .catch((error) => {
        Reject(error);
      });
  });
};

export const GET_API = (endPoint) => {
  return new Promise((Response, Reject) => {
    axios
      .get(`${baseUrl}/${endPoint}`, HEADERS)
      .then((res) => {
        Response(res);
      })
      .catch((error) => {
        Reject(error);
      });
  });
};

export function IsAlphabetOrNumber(character) {
  return /[a-zA-Z0-9]/.test(character);
}

export function CollectValuesByKey(array) {
  let result = [];

  // Iterate over each object in the array
  array.forEach((obj) => {
    // Iterate over each key in the object
    Object.keys(obj).forEach((key) => {
      // Check if the title already exists in the result array
      let existingTitleIndex = result.findIndex((item) => item.title === key);
      if (existingTitleIndex === -1) {
        // If the title doesn't exist, add it with the current value as an array
        result.push({ title: key, valueList: [obj[key]] });
      } else {
        // If the title already exists, push the current value to its array
        result[existingTitleIndex].valueList.push(obj[key]);
      }
    });
  });

  return result;
}
export function RemoveDuplicates(array) {
  return Array.from(new Set(array));
}

export function ConvertAndRemoveDuplicates(array) {
  let convertedArray = array.map((value) =>
    value ? "Available" : "Unavailable"
  );
  return Array.from(new Set(convertedArray));
}

// export function filterAndSearchData(
//   data,
//   filterObject,
//   searchString,
//   priority
// ) {
//   // Apply filtering based on filterObject
//   let filteredData = data.filter((obj) => {
//     for (let key in filterObject) {
//       if (!filterObject[key].includes(obj[key])) {
//         return false;
//       }
//     }
//     return true;
//   });

//   // Apply searching based on searchString
//   if (searchString.trim() !== "") {
//     filteredData = filteredData.filter((obj) => {
//       for (let key in obj) {
//         if (
//           typeof obj[key] === "string" &&
//           obj[key].toLowerCase().includes(searchString.toLowerCase())
//         ) {
//           return true;
//         }
//       }
//       return false;
//     });
//   }

//   return filteredData;
// }
export function FilterAndSearchData({
  data,
  filterObject,
  searchString,
  priority,
}) {
  console.log(
    "data125456",
    data,
    "filterObject",
    filterObject,
    "searchString",
    searchString,
    "priority",
    priority
  );
  let filteredData = [...data];

  // Apply filtering based on filterObject
  if (priority.toLowerCase() === "filter") {
    filteredData = filteredData.filter((obj) => {
      for (let key in filterObject) {
        if (!filterObject[key].includes(obj[key])) {
          return false;
        }
      }
      return true;
    });

    // Apply searching based on searchString
    if (searchString.trim() !== "") {
      filteredData = filteredData.filter((obj) => {
        for (let key in obj) {
          if (
            typeof obj[key] === "string" &&
            obj[key].toLowerCase().includes(searchString.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
    }
  } else if (priority.toLowerCase() === "search") {
    // Apply searching based on searchString
    if (searchString.trim() !== "") {
      filteredData = filteredData.filter((obj) => {
        for (let key in obj) {
          if (
            typeof obj[key] === "string" &&
            obj[key].toLowerCase().includes(searchString.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
    }

    // Apply filtering based on filterObject
    filteredData = filteredData.filter((obj) => {
      for (let key in filterObject) {
        if (!filterObject[key].includes(obj[key])) {
          return false;
        }
      }
      return true;
    });
  }

  return filteredData;
}
export const CheckValidValue = (value, defaultValue, notCheck) => {
  if (["null", null, undefined, "undefined", ""].includes(value)) {
    return defaultValue ? defaultValue : false;
  } else {
    return notCheck ? value : true;
  }
};
export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

export function TransformData(array) {
  let transformedArray = [];

  array.forEach((obj) => {
    for (let key in obj) {
      let value = obj[key];
      let lable = obj[key];

      // Convert timestamps to DD-MM-YYYY format
      //   if (key === "createdAt" || key === "updatedAt") {
      //     lable = formatDate(lable);
      //   }

      //   // Convert boolean values to "Available" or "Unavailable"
      //   if (typeof lable === "boolean") {
      //     lable = lable ? "Available" : "Unavailable";
      //   }

      // Add the transformed key-value pair to the array
      transformedArray.push({ label: lable, value: value });
    }
  });

  // Remove duplicates from the array
  transformedArray = transformedArray.filter(
    (obj, index, self) =>
      index ===
      self.findIndex((o) => o.label === obj.label && o.value === obj.value)
  );

  return transformedArray;
}

export const ReactIcon = ({ iconName, attr }) => {
  const Icon = iconName ? ReactIcons[iconName] : ReactIcons[`AiOutlineSmile`];
  return <Icon {...attr} />;
};

export function ObjectToArrayWithKeyValues(object) {
  const obj = { ...object };
  const result = {};
  for (const key in obj) {
    result[key] = [obj[key]];
  }
  return result;
}

export function MergeNestedObjects(arrayObject) {
  // Iterate over each object in the array
  try {
    const arr = [...arrayObject];
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      // Iterate over each key in the object
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          // If the value is an object and not null or undefined
          if (typeof obj[key] === "object" && obj[key] !== null) {
            // Iterate over the nested object
            for (const nestedKey in obj[key]) {
              if (obj[key].hasOwnProperty(nestedKey)) {
                // If the nested key exists in the main object, rename it
                if (obj.hasOwnProperty(nestedKey)) {
                  if (key == "user") {
                    obj[`${nestedKey}`] = obj[key][nestedKey];
                  } else {
                    obj[`${`${key}`.toUpperCase()}${nestedKey}`] =
                      obj[key][nestedKey];
                  }
                } else {
                  obj[nestedKey] = obj[key][nestedKey];
                }
              }
            }
            // Remove the nested object from the main object
            delete obj[key];
          }
        }
      }
    }
    return arr;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const Logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("UserInfo");
  window.location.reload();
};

export function ExtractKeyValues(arr, keyName) {
  try {
    return arr.map((obj) => obj[keyName]);
  } catch (error) {
    return [];
  }
}
export function GetValueByKeyIncludingId(ObjectData) {
  const obj = { ...ObjectData };
  for (let key in obj) {
    if (key.toLowerCase().includes("id")) {
      return obj[key];
    }
  }
  return null; // If no key including "id" is found
}
