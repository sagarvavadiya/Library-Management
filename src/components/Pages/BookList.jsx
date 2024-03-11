import React, { useEffect, useState } from "react";
import BannerSectionStyle5 from "../Section/BannerSection/BannerSectionStyle5";
import BannerSectionStyle4 from "../Section/BannerSection/BannerSectionStyle4";
import TeamSectionStyle2 from "../Section/TeamSection/TeamSectionStyle2";
import Section from "../Section";
import { pageTitle } from "../../helpers/PageTitle";
import { StoreBookApiResponce } from "../../reduxStore/Action/bookApiAction";
import { useDispatch, useSelector } from "react-redux";
import { FilterAndSearchData } from "../../helpers/functionHelper";
import { Img7, Img8 } from "../../helpers/imageLink";

export default function BookList() {
  const UserState = useSelector((state) => state.user);
  const accessToken = useSelector(
    (state) => state?.user?.userData?.accessToken
  );
  const IsAdmin = UserState?.IsAdmin;
  const BookListState = useSelector((state) => state.book);
  const searchString = BookListState?.searchString ?? "";
  const filterObject = BookListState?.filterObject ?? {};
  const bookLoader = BookListState?.bookLoader ?? false;
  const dispatch = useDispatch();
  const [bookList, setBookList] = useState([]);
  pageTitle("Doctors");

  const LoadData = () => {
    dispatch(StoreBookApiResponce());
  };
  const scrollToBottom = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    LoadData();
    scrollToBottom();
  }, []);

  useEffect(() => {
    setBookList(BookListState?.BookResponse?.data?.data ?? []);
    console.log(BookListState?.BookResponse?.data?.data);
  }, [BookListState]);

  useEffect(() => {
    const filteredData = FilterAndSearchData({
      data: BookListState?.BookResponse?.data?.data ?? [],
      filterObject: filterObject ?? {},
      searchString: searchString,
      priority: "filter", // or "search", depending on your preference
    });
    setBookList(filteredData);
  }, [searchString, filterObject]);

  const test = () => {
    console.log("BookListState", BookListState);
    // dispatch(decrement())
  };

  const AllProps = {
    BookListState: BookListState,
    searchString: searchString,
    filterObject: filterObject,
    bookLoader: bookLoader,
    bookList: bookList,
    IsAdmin: IsAdmin,
    LoadData: LoadData,
  };
  return (
    <>
      <BannerSectionStyle5
        bgUrl="/images/doctors/banner_bg.svg"
        imgUrl={Img7}
        title="Introducing Our Book Shelf"
        subTitle="Explore our books list"
      />
      <Section topMd={65} bottomMd={200} bottomLg={150} bottomXl={110}>
        <TeamSectionStyle2 AllProps={AllProps} />
      </Section>
      <Section className="cs_footer_margin_0">
        <BannerSectionStyle4
          bgUrl={Img8}
          title="Don't Neglect Your Learning!"
          subTitle="Schedule a consultation with one of our experienced library professionals today!"
        />
      </Section>
    </>
  );
}
