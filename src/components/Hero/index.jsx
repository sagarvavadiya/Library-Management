import React from "react";
import parse from "html-react-parser";
import VideoModal from "../VideoModal";
import { Link } from "react-router-dom";
import FunFactSection from "../Section/FunFactSection";
import { Img1 } from "../../helpers/imageLink";

export default function Hero({
  title,
  subTitle,
  bgUrl,
  imgUrl,
  videoBtnText,
  videoUrl,
  infoList,
  btnText,
  btnUrl,
  AllProps,
}) {
  const ShawArray = (data) => {
    const { adminDashboardData } = AllProps || {
      adminDashboardData: {
        todaysIssued: 0,
        todaysDue: 0,
        totalIssued: 1,
        dueMissed: 1,
      },
    };
    const arrayObj = [
      {
        number: adminDashboardData?.todaysIssued ?? "0",
        title: "Todays Issued",
        value: "todaysIssued",
      },
      {
        number: adminDashboardData?.todaysDue ?? "0",
        title: "Todays Due",
        value: "todaysDue",
      },
      {
        number: adminDashboardData?.totalIssued ?? "0",
        title: "Total Issued",
        value: "totalIssued",
      },
      {
        number: adminDashboardData?.dueMissed ?? "0",
        title: "Due Missed",
        value: "dueMissed",
      },
    ];

    return arrayObj;
  };
  return (
    <section className="cs_hero cs_style_1">
      <div
        className="cs_hero_wrap cs_bg_filed"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <div className="container">
          <div className="cs_hero_text">
            <h1 className="cs_hero_title cs_fs_94">{parse(title)}</h1>
            <p className="cs_hero_subtitle cs_fs_20 cs_heading_color">
              {parse(subTitle)}
            </p>
            {/* <div className="cs_hero_btn_wrap">
              <VideoModal
                videoUrl={videoUrl}
                videoBtnText={videoBtnText}
                variant="cs_heading_color"
              />
            </div> */}
          </div>
          {/* <img src={Img1} alt="Hero" className="cs_hero_img" /> */}
          <div className="cs_hero_info_wrap cs_shadow_1 cs_white_bg cs_radius_15">
            {/* {infoList.map((item, index) => (
              <div className="cs_hero_info_col" key={index}>
                <div className="cs_hero_info d-flex align-items-center">
                  <div className="cs_hero_info_icon cs_center rounded-circle cs_accent_bg">
                    <img src={item.iconUrl} alt="Icon" />
                  </div>
                  <div className="cs_hero_info_right">
                    <h3 className="cs_hero_info_title cs_semibold">
                      {item.title}
                    </h3>
                    <p className="cs_hero_info_subtitle cs_fs_20">
                      {item.subTitle}
                    </p>
                  </div>
                </div>
              </div>
            ))} */}
            {/* <div className="cs_hero_info_col">
              <Link to={btnUrl} className="cs_btn cs_style_1">
                <span>{btnText}</span>
                <i>
                  <img src="/images/icons/arrow_white.svg" alt="Icon" />
                  <img src="/images/icons/arrow_white.svg" alt="Icon" />
                </i>
              </Link>
            </div> */}
            <FunFactSection
              bgUrl="images/about/fun_fact_bg.jpeg"
              data={ShawArray()}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
