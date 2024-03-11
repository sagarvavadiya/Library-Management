import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  POST_API,
  PUT_API,
  ToastError,
  ToastSuccess,
} from "../../helpers/functionHelper";
import { BOOK } from "../../helpers/apiConstant";
import { ButtonLoader } from "../../helpers/designHelper";
import { BOOK_LIST_ROUTE } from "../../helpers/routeConstant";
import { useNavigate } from "react-router-dom";

const FildInfo = [
  {
    title: "Name",
    field: "name",
    type: "text",
    placeholder: "Enter book name",
  },
  {
    title: "Author",
    field: "author",
    type: "text",
    placeholder: "Enter author name",
  },
  {
    title: "Stock",
    field: "currentAvailability",
    type: "radio",
    placeholder: "Chose availability status",
    option: [
      { value: "true", lable: "Available" },
      { value: "false", lable: "Unavailable" },
    ],
  },
];
export default function AppointmentForm({ AllProps }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [loader, setLoader] = useState(false);
  const [bookFormData, setBookFormData] = useState({
    name: "",
    author: "",
    currentAvailability: false,
  });
  const { bookData, BookListState, action, viewOption, IsAdmin } = AllProps || {
    bookData: {},
  };
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const Navigation = (data) => {
    navigate(data);
  };

  const GO_RO_LIST_PAGE = () => {
    Navigation(`/${BOOK_LIST_ROUTE}`);
  };
  const Toggle = ({ target }) => {
    const { name, value } = target;
    setStatus(name);
    onHandleChange({
      target: {
        name: "currentAvailability",
        value: status == "Available" ? false : true,
      },
    });
  };
  const onHandleChange = ({ target }) => {
    const { name, value } = target;
    setBookFormData({ ...bookFormData, [name]: value });
    console.log(name, value);
  };

  const handleSubmit = (BookListState) => {
    setLoader(true);
    const submitData = {
      name: bookFormData?.name ?? "",
      author: bookFormData?.author ?? "",
      currentAvailability: bookFormData?.currentAvailability ?? false,
    };
    console.log(bookFormData);
    if (action == "edit") {
      PUT_API({ endPoint: `${BOOK}/${bookData?._id}`, body: submitData })
        .then((res) => {
          ToastSuccess(res);
          setLoader(false);
          GO_RO_LIST_PAGE();
        })
        .catch((err) => {
          ToastError(err);
          setLoader(false);
        });
    } else {
      POST_API({ endPoint: BOOK, body: submitData })
        .then((res) => {
          ToastSuccess(res);
          setLoader(false);
          GO_RO_LIST_PAGE();
        })
        .catch((err) => {
          ToastError(err);
          setLoader(false);
          GO_RO_LIST_PAGE();
        });
    }
  };

  useEffect(() => {
    if (action == "edit") {
      const editFormaData = {
        name: bookData?.name ?? "",
        author: bookData?.author ?? "",
        currentAvailability: bookData?.currentAvailability ?? false,
      };

      bookData?.currentAvailability
        ? setStatus("Available")
        : setStatus("Unavailable");
      setBookFormData(editFormaData);
    }
  }, [bookData]);
  return (
    <div className="row">
      {FildInfo.map((i, index) => {
        return (
          <>
            {i.type != "radio" ? (
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">
                  {i.title}
                </label>
                <>
                  <input
                    type={i.type}
                    name={i.field}
                    value={bookFormData[i.field]}
                    className="cs_form_field"
                    placeholder={i.placeholder}
                    onChange={onHandleChange}
                  />
                </>
              </div>
            ) : (
              <>
                <div className="col-lg-12">
                  <label className="cs_input_label cs_heading_color">
                    {i.title}
                  </label>
                  <div className="cs_radio_group">
                    {i.option.map((item, series) => {
                      return (
                        <>
                          <div className="cs_radio_wrap">
                            <input
                              className="cs_radio_input"
                              type="radio"
                              name={item.lable}
                              checked={item.lable == status}
                              id={item.lable}
                              defaultValue="routineCheckup"
                              onChange={Toggle}
                            />
                            <label
                              className="cs_radio_label"
                              htmlFor="routineCheckup"
                            >
                              {item.lable}
                            </label>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="cs_height_42 cs_height_xl_25" />
                </div>
              </>
            )}

            <div className="cs_height_42 cs_height_xl_25" />
          </>
        );
      })}

      <div className="col-lg-12">
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
