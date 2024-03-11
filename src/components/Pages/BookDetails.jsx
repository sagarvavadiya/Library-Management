import React, { useEffect, useState } from "react";
import BreadcrumbStyle2 from "../Breadcrumb/BreadcrumbStyle2";
import Section from "../Section";
import BannerSectionStyle9 from "../Section/BannerSection/BannerSectionStyle9";
import DoctorDetailsSection from "../Section/DoctorDetailsSection";
import AppointmentSectionStyle2 from "../Section/AppointmentSection/AppointmentSectionStyle2";
import { pageTitle } from "../../helpers/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../helpers/functionHelper";
import { Img10, Img11, Img14 } from "../../helpers/imageLink";
import { StoreUserApiResponce } from "../../reduxStore/Action/userApiAction";

export default function BookDetails() {
  const BookListState = useSelector((state) => state.book);
  const [userList, setUserList] = useState([]);
  const UserState = useSelector((state) => state.user);
  const accessToken = useSelector(
    (state) => state?.user?.userData?.accessToken
  );
  const dispatch = useDispatch();
  const IsAdmin = UserState?.IsAdmin;
  const [bookData, setBookData] = useState({});
  const [action, setAction] = useState("");
  const [viewOption, setViewOption] = useState(true);
  const { _id, updatedAt, name, currentAvailability, createdAt, author } =
    bookData;

  const AllProps = {
    bookData: bookData || {},
    BookListState: BookListState,
    action: action,
    viewOption: viewOption,
    IsAdmin: IsAdmin,
    userList: userList,
  };
  const test = () => {
    console.log("UserState", userList);
  };
  pageTitle("Doctor Details");

  useEffect(() => {
    setBookData(BookListState?.selectedRecord?.data ?? {});
    setAction(BookListState?.selectedRecord?.type ?? "");
    if (["edit", "add"].includes(BookListState?.selectedRecord?.type)) {
      setViewOption(false);
    } else {
      setViewOption(true);
    }
  }, [BookListState]);

  const LoadData = () => {
    dispatch(StoreUserApiResponce());
  };
  useEffect(() => {
    LoadData();
  }, []);
  useEffect(() => {
    setUserList(UserState?.userListResponse?.data?.data ?? []);
  }, [UserState]);
  return (
    <>
      <BreadcrumbStyle2 />
      <Section bottomMd={190} bottomLg={150} bottomXl={110}>
        <DoctorDetailsSection
          userList={userList}
          IsAdmin={IsAdmin}
          viewOption={viewOption}
          bookData={bookData}
          bgUrl="/images/doctors/doctor_details_bg.svg"
          imgUrl={Img11}
          name={name ?? "Book"}
          department={currentAvailability ? "Available" : "Unavailable"}
          designation={author ?? "Dr. J. thomson"}
          description={`Last Updated: ${formatDate(updatedAt)}`}
          social={[
            { icon: "fa6-brands:facebook-f", href: "/about" },
            { icon: "fa6-brands:linkedin-in", href: "/about" },
            { icon: "fa6-brands:twitter", href: "/about" },
          ]}
          contactInfo={[
            { iconUrl: "/images/icons/call.svg", title: "+123+456-7890" },
            {
              iconUrl: "/images/icons/envlope.svg",
              title: "sarahlee@prohealth.com",
            },
          ]}
          contactInfoHeading="Contact Info"
          schedules={[
            { day: "Monday", time: "09.00-12.00" },
            { day: "Wednesday", time: "15.00-18.00" },
            { day: "Friday", time: "09.00-12.00" },
          ]}
          scheduleHeading="Appointment Schedules"
          degrees={[
            {
              title: "University of California, San Francisco.",
              subTitle: "Medical degree",
            },
            {
              title:
                "University of California, Los Angeles (UCLA) Medical Center.",
              subTitle: "Completed residency training in psychiatry",
            },
            {
              title: "University of California, Berkeley.",
              subTitle: "Master of Public Health degree",
            },
          ]}
          degreesHeading="Degrees"
          experiences={[
            {
              title:
                "Worked in community mental health clinics, private practice, and academic medical centers.",
            },
            {
              title:
                "Expertise in the treatment of mood disorders, anxiety disorders, and psychotic disorders.",
            },
            {
              title: `Special interest in women's mental health and perinatal psychiatry.`,
            },
            {
              title:
                "Experience managing complex cases that involve both mental health and medical issues.",
            },
          ]}
          experiencesHeading="Experiences"
          awards={[
            { title: "Fellow of the American Psychiatric Association (FAPA)." },
            {
              title:
                "Recognized for research contributions with grants from the National Institute of Mental Health (NIMH) and the American Foundation for Suicide Prevention.",
            },
          ]}
          awardHeading="Awards/Achievements"
        />
      </Section>
      {!viewOption ? (
        <Section bottomMd={200} bottomLg={150} bottomXl={110}>
          <AppointmentSectionStyle2
            bgUrl="/images/home_2/appointment_bg.svg"
            imgUrl={Img14}
            sectionTitle="Book Details"
            sectionTitleUp="WRITE HERE"
            AllProps={AllProps}
          />
        </Section>
      ) : (
        ""
      )}
      <Section className="cs_footer_margin_0">
        <BannerSectionStyle9
          title="Don't Neglect Your Learning!"
          subTitle="Schedule a consultation with one of our experienced library professionals today!"
          imgUrl={Img10}
          AllProps={AllProps}
        />
      </Section>
    </>
  );
}
