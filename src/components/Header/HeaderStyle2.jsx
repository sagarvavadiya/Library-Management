import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DropDown from "./DropDown";
import Button from "../Button";
import { useSelector } from "react-redux";
import { CheckValidValue, Logout } from "../../helpers/functionHelper";

export default function HeaderStyle2({ logoSrc, variant, btnText, btnUrl }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  const UserState = useSelector((state) => state.user);
  const accessToken = UserState?.userData?.accessToken;
  const IsAdmin = UserState?.IsAdmin;
  const accessTokenLength = CheckValidValue(accessToken)
    ? accessToken.length
    : "";
  const ValidAccessToken = accessTokenLength > 10;
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const LoginPath = () => {
    const scrollToBottom = () => {
      // Get the target element you want to scroll to
      window.scrollTo(0, document.body.scrollHeight);
    };
    setMobileToggle(false);
    scrollToBottom();
  };

  const OnCloseSideBar = () => setMobileToggle(false);
  return (
    <>
      <header
        onClick={() => console.log("accessToken", accessToken)}
        className={`cs_site_header cs_style1 cs_sticky_header ${
          mobileToggle ? "cs_mobile_toggle_active" : ""
        } ${variant} ${isSticky ? "cs_active_sticky" : ""}`}
      >
        <div className="cs_main_header">
          <div className="container">
            <div className="cs_main_header_in">
              <div className="cs_main_header_left">
                <Link className="cs_site_branding" to="/">
                  <img
                    src={`/images/library_logo.png`}
                    alt="Logo"
                    className="library_logo"
                  />
                </Link>
              </div>
              <div className="cs_main_header_center">
                <nav className="cs_nav">
                  <ul
                    className={`${
                      mobileToggle ? "cs_nav_list cs_active" : "cs_nav_list"
                    }`}
                  >
                    <li onClick={OnCloseSideBar}>
                      <Link to="/dashbord">Dashboard</Link>
                    </li>
                    <li onClick={OnCloseSideBar}>
                      <Link to="/">About</Link>
                    </li>
                    <li onClick={OnCloseSideBar}>
                      <Link to="/booklist">Book Shelf</Link>
                    </li>
                    <li onClick={OnCloseSideBar}>
                      <Link to="/user_management">User Management</Link>
                    </li>
                    <li onClick={OnCloseSideBar}>
                      <Link to="/profile">Profile</Link>
                    </li>

                    {ValidAccessToken ? (
                      <li onClick={LoginPath}>
                        <Link to="">Login</Link>
                      </li>
                    ) : (
                      <li onClick={Logout}>
                        <Link to="">Log out</Link>
                      </li>
                    )}
                  </ul>
                  <span
                    className={
                      mobileToggle
                        ? "cs_menu_toggle cs_teggle_active"
                        : "cs_menu_toggle"
                    }
                    onClick={() => setMobileToggle(!mobileToggle)}
                  >
                    <span></span>
                  </span>
                </nav>
              </div>
              <div className="cs_main_header_right">
                <Button btnUrl={btnUrl} btnText={btnText} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
