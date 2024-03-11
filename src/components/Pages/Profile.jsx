import React, { useEffect, useState } from "react";
import Section from "../Section";
import BreadcrumbStyle2 from "../Breadcrumb/BreadcrumbStyle2";
import AboutSectionStyle2 from "../Section/AboutSection/AboutSectionStyle2";
import FeaturesSectionStyle3 from "../Section/FeaturesSection/FeaturesSectionStyle3";
import { pageTitle } from "../../helpers/PageTitle";
import { TRNSACTION } from "../../helpers/apiConstant";
import { GET_API, ToastError } from "../../helpers/functionHelper";
import { StoreUsertransactionData } from "../../reduxStore/Action/userApiAction";
import { useDispatch, useSelector } from "react-redux";
import { Img13 } from "../../helpers/imageLink";

export default function Profile() {
  const [transactionData, setTransactionData] = useState({});
  const [loader, setLoader] = useState(false);
  const UserState = useSelector((state) => state.user);
  const { userData, usertransactionData } = UserState || {
    userData: {},
    usertransactionData: [],
  };

  const dispatch = useDispatch();
  pageTitle("Profile");

  const StoretransactionData = () => {
    setLoader(true);
    console.log("StoreBookApiResponce test1");
    GET_API(TRNSACTION)
      .then((response) => {
        dispatch(StoreUsertransactionData(response?.data?.data ?? []));
        setTransactionData(response?.data?.data ?? []);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        ToastError(error);
      });
  };

  const AllProps = {
    transactionData: usertransactionData,
    loader: loader,
    userData: userData,
    usertransactionData: usertransactionData,
  };
  useEffect(() => {
    StoretransactionData();
  }, []);

  const Test = () => {
    console.log("transactionData  ", transactionData);
    console.log("usertransactionData totle", usertransactionData);
  };

  return (
    <>
      <BreadcrumbStyle2 />
      <Section topMd={135} topLg={100} topXl={100}>
        <AboutSectionStyle2
          title={userData?.name ?? "User"}
          subTitle={`Role: ${userData?.role}` ?? "Role: User"}
          email={`Email: ${userData?.email}` ?? "user@gmail.com"}
          imgUrl={Img13}
        />
      </Section>

      <Section topMd={170} topLg={145} topXl={90}>
        {usertransactionData && usertransactionData.length == 0 ? (
          <>
            {" "}
            <div class="cs_iconbox_8_wrap cs_radius_30 NoRecordBox">
              <h3> No any Transaction Found</h3>
            </div>
          </>
        ) : (
          <FeaturesSectionStyle3
            sectionTitle="Transaction"
            sectionTitleUp="All TYPE OF"
            AllProps={AllProps}
          />
        )}
      </Section>
      {/* <Section topMd={200} topLg={150} topXl={100}>
        <TeamSectionStyle3
          sectionTitle="Related Doctor"
          data={doctorData}
          AllProps={AllProps}
        />
      </Section> */}

      {/* Start Appointment Section */}
      {/* <Section
        topMd={190}
        topLg={145}
        topXl={105}
        bottomMd={190}
        bottomLg={145}
        bottomXl={110}
        id="appointment"
      >
        <AppointmentSection
          sectionTitle="Appointment"
          sectionTitleUp="BOOK AN"
          imgUrl="/images/home_1/appointment.jpeg"
        />
      </Section> */}
      {/* End Appointment Section */}
      {/* <Section className="cs_footer_margin_0">
        <BannerSectionStyle7
          imgUrl="/images/departments/banner_img_3.png"
          bgUrl="/images/departments/banner_bg_3.svg"
          title="Don’t Let Your Health <br />Take a Backseat!"
          subTitle="Schedule an appointment with one of our experienced <br />medical professionals today!"
        />
      </Section> */}
    </>
  );
}
