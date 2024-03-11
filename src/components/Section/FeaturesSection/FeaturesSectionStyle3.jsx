import React from "react";
import SectionHeading from "../../SectionHeading";
import Spacing from "../../Spacing";
import IconBoxStyle8 from "../../IconBox/IconBoxStyle8";
import { CheckValidValue, formatDate } from "../../../helpers/functionHelper";

export default function FeaturesSectionStyle3({
  sectionTitle,
  sectionTitleUp,

  AllProps,
}) {
  const { userData, transactionData } = AllProps || {
    userData: {},
    transactionData: [],
  };

  const CardData = (data) => {
    console.log("CardData", data?.book?.name);
    const bookName = CheckValidValue(data?.book?.name, "-", true);
    const Array = [
      {
        title: "Book name",
        subTitle: bookName,
        // CheckValidValue(`${(data?.book?.author, "-", true)}`) ?? "Default",
        iconUrl: "/images/departments/icon_9.svg",
      },
      {
        title: "Borrow At",
        subTitle: formatDate(data?.createdAt) ?? "Default",
        iconUrl: "/images/departments/icon_10.svg",
      },
      {
        title: "Transection Type",
        subTitle: data?.transactionType ?? "Default",
        iconUrl: "/images/departments/icon_11.svg",
      },
      {
        title: "Due date",
        subTitle: formatDate(data?.dueDate) ?? "Default",
        iconUrl: "/images/departments/icon_12.svg",
      },
    ];
    return Array;
  };
  return (
    <div className="container" onClick={() => console.log(transactionData)}>
      <div>
        <SectionHeading title={sectionTitle} titleUp={sectionTitleUp} />
        <Spacing md="72" lg="50" />
        <div className="cs_iconbox_8_wrap cs_radius_30 p-2">
          {transactionData[0] ? (
            <>
              {transactionData &&
                transactionData?.map((i, index) => {
                  return (
                    <>
                      <div className="row" key={index}>
                        {CardData(i)?.map((item, ind) => (
                          <div className="col-xl-3 col-md-6" key={ind}>
                            <IconBoxStyle8
                              {...item}
                              bookData={i}
                              index={index}
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
