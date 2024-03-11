import React, { useState } from "react";
import Spacing from "../../Spacing";
import TeamStyle2 from "../../Team/TeamStyle2";
import Pagination from "../../Pagination";
import AutoComplatete from "../../../helpers/commonComponent/autoComplatete";
import FilterComponent from "../../../helpers/commonComponent/FilterComponent/filterComponent";
import { useDispatch } from "react-redux";
import {
  StoreSearchFilterValue,
  StoreSelectedRecord,
} from "../../../reduxStore/Action/bookApiAction";
import { ReactIcon } from "../../../helpers/functionHelper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ManageComponent } from "../../../helpers/designHelper";

export default function TeamSectionStyle2({ AllProps }) {
  const [view, setView] = useState("grid");
  const [active, setActive] = useState("all");
  const dispatch = useDispatch();
  const { bookLoader, bookList, filterObject, IsAdmin, LoadData } =
    AllProps || {};
  // Extracting unique categories from teamData
  const IsClearFilterHide = Object.keys(filterObject).length
    ? Object.keys(filterObject).length === 0
    : true;
  const navigate = useNavigate();
  const Navigation = (data) => {
    navigate(data);
  };

  const ClearFilter = () => {
    // console.log(
    //   "filt258456",
    //   filterObject.length,
    //   "sear",
    //   `${searchString}`.length
    // );
    dispatch(StoreSearchFilterValue({ type: "filter", data: {} }));
  };

  const StoreData = (data) => {
    dispatch(StoreSelectedRecord({ type: "add" }));
    Navigation("/booklist/add-book");
  };
  return (
    <div className="container">
      <div className="cs_doctors_heading">
        <div className="cs_isotop_filter cs_style1">
          <ul className="cs_mp0">
            <li className={`active ${IsAdmin ? "" : "d-none"}`}>
              <span onClick={StoreData}>{`Add book`}</span>
            </li>

            <li className={`active ${IsClearFilterHide ? "d-none" : ""}`}>
              <span onClick={ClearFilter}>{`Clear Filter`}</span>
            </li>
          </ul>

          <FilterComponent />
          <AutoComplatete />
        </div>
        <div className="cs_view_box">
          {bookList ? <span>Showing {bookList.length} items</span> : ""}
          <div className="cs_view_box_in">
            <button
              type="button"
              className={`cs_grid_view ${view === "grid" ? "active" : ""}`}
              onClick={() => setView("grid")}
            >
              <svg
                width={25}
                height={25}
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 11.8571H11.8571V0H0V11.8571ZM1.5625 1.5625H10.2948V10.2948H1.5625V1.5625ZM13.1429 0V11.8571H25V0H13.1429ZM23.4375 10.2948H14.7052V1.5625H23.4375V10.2948ZM0 25H11.8571V13.1429H0V25ZM1.5625 14.7052H10.2948V23.4375H1.5625V14.7052ZM13.1429 25H25V13.1429H13.1429V25ZM14.7052 14.7052H23.4375V23.4375H14.7052V14.7052Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              type="button"
              className={`cs_list_view ${view === "list" ? "active" : ""}`}
              onClick={() => setView("list")}
            >
              <svg
                width={25}
                height={25}
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 11.8571H12.2396V0H0V11.8571ZM1.6129 1.5625H10.6267V10.2946H1.6129V1.5625ZM0 25H12.2396V13.1429H0V25ZM1.6129 14.7052H10.6267V23.4375H1.6129V14.7052ZM25 0.85022V2.41272H14.3731V0.85022H25ZM14.3731 9.44458H25V11.0071H14.3731V9.44458ZM14.3731 5.1475H25V6.71H14.3731V5.1475ZM14.3731 13.9929H25V15.5554H14.3731V13.9929ZM14.3731 22.5873H25V24.1498H14.3731V22.5873ZM14.3731 18.2902H25V19.8527H14.3731V18.2902Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Spacing md="65" />
      <div className={`cs_team_grid cs_${view}_view_wrap`}>
        {/* {(bookList && bookList.length) ?? [] == 0 ? (
          <>
            {" "}
            <div class="cs_iconbox_8_wrap cs_radius_30 NoRecordBox">
              <h3> No any Book Found</h3>
            </div>
          </>
        ) : (
          <> */}
        {/* {bookList?.map((item, index) => (
          <TeamStyle2
            data={{ ...item }}
            series={index + 1}
            key={index}
            _id={item?._id ?? ""}
            name={item?.name ?? ""}
            updatedAt={item?.updatedAt ?? ""}
            currentAvailability={item?.currentAvailability ?? ""}
            createdAt={item?.createdAt ?? ""}
            author={item?.author ?? ""}
            IsAdmin={IsAdmin}
            LoadData={LoadData}
          />
        ))} */}
        {/* </>
        )} */}
        <ManageComponent
          list={bookList}
          loader={bookLoader}
          content={
            <>
              {" "}
              {bookList?.map((item, index) => (
                <TeamStyle2
                  data={{ ...item }}
                  series={index + 1}
                  key={index}
                  _id={item?._id ?? ""}
                  name={item?.name ?? ""}
                  updatedAt={item?.updatedAt ?? ""}
                  currentAvailability={item?.currentAvailability ?? ""}
                  createdAt={item?.createdAt ?? ""}
                  author={item?.author ?? ""}
                  IsAdmin={IsAdmin}
                  LoadData={LoadData}
                />
              ))}
            </>
          }
        />
      </div>
      <Spacing md="90" />
      {/* <Pagination /> */}
    </div>
  );
}
