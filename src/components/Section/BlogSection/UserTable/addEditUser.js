import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { BOOK_LIST_ROUTE } from "../../../../helpers/routeConstant";
import { ButtonLoader } from "../../../../helpers/designHelper";
import { BOOK, USER } from "../../../../helpers/apiConstant";
import {
  ToastSuccess,
  POST_API,
  PUT_API,
  ToastError,
  DELETE_API,
} from "../../../../helpers/functionHelper";
import { StoreUserApiResponce } from "../../../../reduxStore/Action/userApiAction";
import { useDispatch } from "react-redux";

export default function AddEditUserForm({ recordData, toogle, LoadData }) {
  const FildInfo = [
    {
      title: "User Name",
      field: "userName",
      type: "text",
      placeholder: "Enter User Name",
    },
    {
      title: "Name",
      field: "name",
      type: "text",
      placeholder: "Enter Name",
    },
    {
      title: "Email",
      field: "email",
      type: "text",
      placeholder: "Enter Email",
    },
    {
      title: "Mobile no",
      field: "contact",
      type: "number",
      placeholder: "Enter Contact No",
    },
  ];
  const [loader, setLoader] = useState(false);
  const [userFormData, setUserFormData] = useState({
    userName: "",
    name: "",
    email: "",
    contact: "",
  });
  const { recordObj, action, message } = recordData || {
    recordObj: {},
  };
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Navigation = (data) => {
    navigate(data);
  };

  const onHandleChange = ({ target }) => {
    const { name, value } = target;
    setUserFormData({ ...userFormData, [name]: value });
    console.log(name, value);
  };

  // const LoadData = () => {
  //   dispatch(StoreUserApiResponce());
  // };
  const handleSubmit = () => {
    setLoader(true);
    let submitData = {
      userName: userFormData?.userName ?? "",
      name: userFormData?.name ?? "",
      email: userFormData?.email ?? "",
      contact: userFormData?.contact ?? 0,
    };
    console.log(userFormData);
    if (action == "edit") {
      submitData = { updateUser: { ...submitData } };
      PUT_API({ endPoint: `${USER}/${recordObj?._id}`, body: submitData })
        .then((res) => {
          ToastSuccess(res);
          setLoader(false);
          LoadData();
          toogle();
        })
        .catch((err) => {
          ToastError(err);
          setLoader(false);
        });
    } else if (action == "delete") {
      DELETE_API({ endPoint: `${USER}/${recordObj?._id}`, body: {} })
        .then((res) => {
          ToastSuccess(res);
          setLoader(false);
          LoadData();
          // LoadData();
          toogle();
        })
        .catch((err) => {
          ToastError(err);
          setLoader(false);
        });
    } else if (action == "add") {
      submitData.password = userFormData?.password ?? "";
      POST_API({ endPoint: USER, body: submitData })
        .then((res) => {
          ToastSuccess(res);
          setLoader(false);
          LoadData();
          // LoadData();
          toogle();
        })
        .catch((err) => {
          ToastError(err);
          setLoader(false);
        });
    }
  };

  useEffect(() => {
    if (action == "edit") {
      const editFormaData = {
        userName: recordObj?.userName ?? "",
        name: recordObj?.name ?? "",
        email: recordObj?.email ?? "",
        contact: recordObj?.contact ?? 0,
      };

      recordObj?.currentAvailability
        ? setStatus("Available")
        : setStatus("Unavailable");
      setUserFormData(editFormaData);
    }
  }, [recordObj]);

  const test = () => {
    // LoadData();
  };
  return (
    <div className="row" onClick={test}>
      {action == "delete" ? (
        <>
          <br />
          <div>&nbsp; {message}</div>
          <br />
        </>
      ) : (
        <>
          {FildInfo.map((i, index) => {
            return (
              <>
                <div className="col-lg-6">
                  <label className="cs_input_label cs_heading_color">
                    {i.title}
                  </label>
                  <>
                    <input
                      type={i.type}
                      name={i.field}
                      value={userFormData[i.field]}
                      className="cs_form_field"
                      placeholder={i.placeholder}
                      onChange={onHandleChange}
                    />
                  </>
                </div>

                <div className="cs_height_42 cs_height_xl_25" />
              </>
            );
          })}
          {action == "add" ? (
            <>
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">
                  Password
                </label>
                <>
                  <input
                    type={"password"}
                    name={"password"}
                    className="cs_form_field"
                    placeholder={"Please enter password"}
                    onChange={onHandleChange}
                  />
                </>
              </div>

              <div className="cs_height_42 cs_height_xl_25" />
            </>
          ) : (
            ""
          )}
        </>
      )}

      <div className="col-lg-12 p-3">
        <button className="cs_btn cs_style_1" onClick={handleSubmit}>
          {loader ? <ButtonLoader /> : ""}
          <span>Submit</span>
          <i>
            <img src="/images/icons/arrow_white.svg" alt="Icon" />
            <img src="/images/icons/arrow_white.svg" alt="Icon" />
          </i>
        </button>
      </div>
    </div>
  );
}
