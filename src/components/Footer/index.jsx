import React from "react";
import ContactInfoWidget from "../Widget/ContactInfoWidget";
import MenuWidget from "../Widget/MenuWidget";
import SocialWidget from "../Widget/SocialWidget";
import Newsletter from "../Widget/Newsletter";
import TextWidget from "../Widget/TextWidget";
import { useSelector } from "react-redux";
import { CheckValidValue } from "../../helpers/functionHelper";
const menuDataOne = [
  { title: "About Us", href: "/" },
  { title: "Book Shelf", href: "/booklist" },
];
const menuDataTwo = [{ title: "Profile", href: "/profile" }];

export default function Footer() {
  const UserState = useSelector((state) => state.user);
  const accessToken = UserState?.userData?.accessToken;
  const IsAdmin = UserState?.IsAdmin;
  const accessTokenLength = CheckValidValue(accessToken)
    ? accessToken.length
    : "";
  const ValidAccessToken = accessTokenLength > 10;
  return (
    <footer className="cs_footer cs_style_1 cs_heading_color">
      <div
        className="cs_footer_logo_wrap"
        style={{ backgroundImage: "url(/images/footer_bg_1.svg)" }}
      >
        <div
          className="cs_footer_brand"
          style={{ backgroundImage: "url(/images/footer_logo_bg.svg)" }}
        >
          <img
            src="/images/library_logo.png"
            alt="Logo Icon"
            className="cs_footer_brand_icon"
          />
          <h2 className="cs_footer_brand_text">Library</h2>
        </div>
      </div>
      <div className="cs_footer_main">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="cs_footer_item">
                <TextWidget text="Library Management System" />
                {/* <ContactInfoWidget /> */}
              </div>
            </div>
            <div className="col-lg-2">
              <div className="cs_footer_item">
                <MenuWidget data={menuDataOne} />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="cs_footer_item">
                <MenuWidget data={menuDataTwo} />
              </div>
            </div>
            <div className={`col-lg-4 ${ValidAccessToken ? "d-none" : ""}`}>
              <div className="cs_footer_item">
                <Newsletter
                  title={accessToken ? "Log in other User" : "Log In Here"}
                  subTitle="To get the facilities of app"
                  accessToken={accessToken}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cs_footer_bottom cs_accent_bg">
        <div className="container">
          <div className="cs_footer_bottom_in">
            <SocialWidget />
            <div className="cs_copyright">
              Copyright © 2024 Library Management System. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
