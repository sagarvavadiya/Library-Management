import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookCover3D } from "../../helpers/designHelper";
import {
  DELETE_API,
  POST_API,
  ReactIcon,
  ToastError,
  ToastSuccess,
} from "../../helpers/functionHelper";
import { useDispatch } from "react-redux";
import { StoreSelectedRecord } from "../../reduxStore/Action/bookApiAction";
import CommonModel from "../../helpers/commonComponent/CommanModel/CommonModel";
import { Button, Modal } from "react-bootstrap";
import { BOOK } from "../../helpers/apiConstant";
export default function TeamStyle2({
  imgUrl,
  department,
  designation,
  description,
  social,
  href,

  _id,
  name,
  updatedAt,
  currentAvailability,
  createdAt,
  author,
  data,
  series,
  IsAdmin,
  LoadData,
}) {
  const dispatch = useDispatch();

  const [deleteRecord, setDeleteRecord] = useState(false);
  const [loader, setLoader] = useState(false);
  const [deleteRecordData, setDeleteRecordData] = useState({});

  const navigate = useNavigate();
  const Navigation = (data) => {
    navigate(data);
  };

  const StoreData = (data) => {
    dispatch(StoreSelectedRecord(data));
  };

  const OnDelete = (data) => {
    setDeleteRecordData(data);
    setDeleteRecord(true);
  };

  const Toogle = (value) => {
    value ? setDeleteRecord(value) : setDeleteRecord(!deleteRecord);
  };
  const onSubmit = () => {
    const deleteData = {
      name: deleteRecord?.name ?? "",
      author: deleteRecord?.author ?? "",
    };

    setLoader(true);
    DELETE_API({ endPoint: `${BOOK}/${_id}`, body: deleteData })
      .then((res) => {
        ToastSuccess(res);
        setLoader(false);
        Toogle();
        LoadData();
      })
      .catch((err) => {
        ToastError(err);
        setLoader(false);
        Toogle();
      });
  };
  const IconArray = [
    {
      icon: "AiFillEye",
      href: "/booklist/book-details",
      type: "view",
    },
    {
      icon: "AiFillEdit",
      href: "/booklist/book-edit",
      type: "edit",
    },
    {
      icon: "AiFillDelete",
      href: "",
      type: "delete",
    },
  ];

  return (
    <div className="cs_team cs_style_1 cs_type_2 text-center cs_radius_20 overflow-hidden">
      <div className="cs_member_img">
        <Link to={href} className="d-block">
          {/* <img src={imgUrl} alt="Doctor" /> */}
          <BookCover3D title={`${name}`} />
        </Link>
        <div
          className={`cs_label cs_white_color ${
            currentAvailability ? "cs_accent_bg" : "Red_Background"
          }`}
        >
          {currentAvailability ? "Available" : "Unavailable"}
        </div>
      </div>
      <div className="cs_team_meta cs_white_bg">
        <div>
          <h3 className="cs_member_name cs_fs_32">
            <Link to={href}>{name}</Link>
          </h3>
          <p className="cs_member_designation cs_heading_color cs_medium">
            {author}
          </p>
          <p className="cs_member_description">{description}</p>
        </div>
        <div>
          <div className="cs_social_links">
            {IconArray?.map((item, index) =>
              item.type == "delete" ? (
                <>
                  <span
                    className={IsAdmin ? "" : "d-none"}
                    key={index}
                    onClick={() => {
                      OnDelete({ ...data });
                    }}
                  >
                    <Link
                      // to={{ pathname: item.href, state: { data: "data" } }}
                      to={""}
                      key={index}
                    >
                      {/* <Icon icon={item.icon} /> */}
                      {ReactIcon({ iconName: item.icon })}
                      <div class="i-material-symbols:add-shopping-cart w-1em h-1em"></div>
                    </Link>
                  </span>
                </>
              ) : (
                <>
                  {item?.type == "edit" ? (
                    <span
                      className={IsAdmin ? "" : "d-none"}
                      key={index}
                      onClick={() => {
                        StoreData({ type: item?.type, data: data });
                      }}
                    >
                      <Link
                        // to={{ pathname: item.href, state: { data: "data" } }}
                        to={item.href}
                        key={index}
                      >
                        {/* <Icon icon={item.icon} /> */}
                        {ReactIcon({ iconName: item.icon })}
                        <div class="i-material-symbols:add-shopping-cart w-1em h-1em"></div>
                      </Link>
                    </span>
                  ) : (
                    <span
                      key={index}
                      onClick={() => {
                        StoreData({ type: item?.type, data: data });
                      }}
                    >
                      <Link
                        // to={{ pathname: item.href, state: { data: "data" } }}
                        to={item.href}
                        key={index}
                      >
                        {/* <Icon icon={item.icon} /> */}
                        {ReactIcon({ iconName: item.icon })}
                        <div class="i-material-symbols:add-shopping-cart w-1em h-1em"></div>
                      </Link>
                    </span>
                  )}
                </>
              )
            )}
          </div>
        </div>
      </div>
      <CommonModel
        title={"Delete Book"}
        BodyComponent={<ModelBody data={`Are sure to delete ${name} Book`} />}
        show={deleteRecord}
        onSubmit={onSubmit}
        toogle={() => Toogle()}
        loader={loader}
      />
    </div>
  );
}

const ModelBody = ({ data }) => {
  return (
    <>
      <div>{data}</div>
    </>
  );
};
