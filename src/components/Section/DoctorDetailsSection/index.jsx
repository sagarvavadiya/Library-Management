import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "../../List";
import ListStyle3 from "../../List/ListStyle3";
import ListStyle2 from "../../List/ListStyle2";
import Spacing from "../../Spacing";
import CommonModel from "../../../helpers/commonComponent/CommanModel/CommonModel";
import { BOOK, USER } from "../../../helpers/apiConstant";
import {
  ExtractKeyValues,
  GET_API,
  GetValueByKeyIncludingId,
  POST_API,
  ReactIcon,
  ToastError,
  ToastSuccess,
  ToastWarning,
} from "../../../helpers/functionHelper";
import { Button } from "react-bootstrap";
import { USER_ID, baseUrl } from "../../../helpers/generalConstant";
import DatePicker from "react-datepicker";
import { BookCover3D } from "../../../helpers/designHelper";
import CommonAutoComplatete from "../../CommonComponent/AutoComplate/CommonAutoComplate";
import Autocomplete from "react-autocomplete";
export default function DoctorDetailsSection({
  bgUrl,
  imgUrl,
  name,
  department,
  designation,
  description,
  social,
  contactInfo,
  contactInfoHeading,
  degrees,
  degreesHeading,
  experiences,
  experiencesHeading,
  awards,
  awardHeading,
  schedules,
  scheduleHeading,
  bookData,
  viewOption,
  IsAdmin,
  userList,
}) {
  console.log("object social", social);
  const [loader, setLoader] = useState(false);
  const [isBookIssue, setIsBookIssue] = useState(false);
  const [modelShow, setModelShow] = useState(false);
  const [date, setDate] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const Toogle = (value) => {
    modelShow ? setLoader(false) : console.log("");
    value ? setModelShow(value) : setModelShow(!modelShow);
  };
  const onSubmit = () => {
    try {
      const userIdValue = GetValueByKeyIncludingId(bookData);
      const UserId =
        (userList &&
          userList?.filter((i) => i.name == selectedUser)[0]["_id"]) ??
        "";
      const issueBookData = {
        userId: UserId,
        dueDate: date,
      };

      setLoader(true);
      if (isBookIssue) {
        if (![null, undefined, "", "null", "undefined"].includes(date)) {
          POST_API({
            endPoint: `${BOOK}/${"issue"}/${bookData?._id}`,
            body: issueBookData,
          })
            .then((res) => {
              ToastSuccess(res);
              setLoader(false);
              setDate("");
              Toogle();
            })
            .catch((err) => {
              ToastError(err);
              setLoader(false);
              Toogle();
            });
        } else {
          ToastWarning("Please Enter Issue Date");
          setLoader(false);
        }
      } else {
        POST_API({
          endPoint: `${BOOK}/${"return"}/${userIdValue}`,
          body: {},
        })
          .then((res) => {
            ToastSuccess(res);
            setLoader(false);
            setDate("");
            Toogle();
          })
          .catch((err) => {
            ToastError(err);
            setLoader(false);
            Toogle();
          });
      }
    } catch (error) {
      console.log(error);
      ToastError(error);
    }
  };

  const onBookAction = (data) => {
    data.action == "return" ? setIsBookIssue(false) : setIsBookIssue(true);
    setModelShow(true);
  };
  const IconArray = [
    {
      href: "*",
      icon: "AiFillCarryOut",
      tooltip: "Book Issue",
      variant: "success",
      action: "issue",
    },
    {
      href: "*",
      icon: "AiOutlineSelect",
      tooltip: "Book Return",
      variant: "light",
      action: "return",
    },
  ];

  useEffect(() => {}, [selectedUser]);
  const ModelBody = ({ data }) => {
    return (
      <>
        <div className="IssueAndReturnBox">
          <div>
            <div className="col-lg-6">
              {isBookIssue ? (
                <>
                  <label className="cs_input_label cs_heading_color">
                    Issue Date
                  </label>
                  <div className="cs_with_icon_input">
                    <CommonAutoComplatete
                      setState={setSelectedUser}
                      options={ExtractKeyValues(userList, "name")}
                      lableValueFrom={"name"}
                      inputName={selectedUser}
                    />
                  </div>
                  <br />
                  <div className="cs_with_icon_input">
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      isClearable
                      placeholderText="dd/mm/yyyy"
                    />
                    <i>
                      <Icon icon="fa6-solid:calendar-days" />
                    </i>
                  </div>
                </>
              ) : (
                ""
              )}

              <div className="cs_height_42 cs_height_xl_25" />
            </div>
          </div>
          <div> {data}</div>
        </div>
      </>
    );
  };
  return (
    <div className={`cs_doctor_details ${viewOption ? "" : "d-none"}`}>
      <div
        className="cs_doctor_details_bg cs_bg_filed"
        style={{
          backgroundImage: `url(${bgUrl})`,
        }}
      />
      <Spacing md="85" />
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="cs_single_doctor overflow-hidden cs_radius_20">
              <img src={imgUrl} alt="Doctor" className="w-100" />
              {/* <BookCover3D title={`${name}`} /> */}
              <h3
                className={`cs_white_color  mb-0 text-center cs_semibold cs_fs_24 ${
                  bookData?.currentAvailability
                    ? "cs_accent_bg"
                    : "Red_Background"
                }`}
              >
                {department}
              </h3>
            </div>
            {/* <Spacing md="94" lg="60" />
            <ListStyle2
              heading={contactInfoHeading}
              iconUrl="/images/icons/schedule.svg"
              data={contactInfo}
            />
            <Spacing md="66" lg="60" />
            <ListStyle3
              heading={scheduleHeading}
              iconUrl="/images/icons/schedule.svg"
              data={schedules}
            /> */}
          </div>
          <div className="col-lg-6 offset-lg-1 position-relative">
            <Spacing md="55" />
            <h2 className="cs_fs_48 mb-0 cs_semibold">{name}</h2>
            <Spacing md="12" />
            <h3 className="cs_semibold cs_fs_24 mb-0">{designation}</h3>
            <Spacing md="32" />
            <p className="mb-0 cs_heading_color">{description}</p>
            <div
              className={`cs_social_links   cs_radius_15 LightGray_Background ${
                IsAdmin ? "" : "d-none"
              }`}
            >
              {IconArray?.map((item, index) => (
                // <span>
                //   <Link to={"*"} key={index}>
                //     {ReactIcon({ iconName: item.icon })}
                //   </Link>

                // </span>

                <Button
                  variant={item.variant}
                  onClick={() => onBookAction(item)}
                >
                  {ReactIcon({
                    iconName: item.icon,
                  })}{" "}
                  {item.tooltip}
                </Button>
              ))}
            </div>
            <Spacing md="200" xl="150" lg="80" />
            <Spacing md="35" lg="0" />
            {/* <List
              heading={degreesHeading}
              iconUrl="/images/icons/graduation.svg"
              data={degrees}
            />
            <Spacing md="70" lg="50" />
            <List
              heading={experiencesHeading}
              iconUrl="/images/icons/experience.svg"
              data={experiences}
            />
            <Spacing md="70" lg="50" />
            <List
              heading={awardHeading}
              iconUrl="/images/icons/award2.svg"
              data={awards}
            /> */}
          </div>
        </div>
      </div>
      <CommonModel
        title={isBookIssue ? "Issue Book" : "Return Book"}
        BodyComponent={
          <ModelBody
            data={`Are you want to ${
              isBookIssue ? "Issue" : "Return"
            } ${name} Book`}
          />
        }
        show={modelShow}
        onSubmit={onSubmit}
        toogle={() => Toogle()}
        loader={loader}
      />
    </div>
  );
}
