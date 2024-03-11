import { Img7 } from "./imageLink";

// eslint-disable-next-line import/prefer-default-export
export function BookCover3D({ title }) {
  return (
    <div className="book-container">
      <div className="book">
        <img
          alt="The Outstanding Developer by Sebastien Castiel"
          src={Img7} //"https://plus.unsplash.com/premium_photo-1664392455446-1e636959468b?q=80&w=1945&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="BoocCoverTitle">{title ?? "Book"} </div>
      </div>
    </div>
  );
}

export const ButtonLoader = () => {
  return (
    <>
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="sr-only"></span>
      </div>
    </>
  );
};

export const CommonButtom = ({ loader, lable, attr }) => {
  return (
    <button className="cs_btn cs_style_1" {...attr}>
      {loader ? <ButtonLoader /> : ""}
      <span>{lable ?? "Submit"}</span>
      <i>
        <img src="/images/icons/arrow_white.svg" alt="Icon" />
        <img src="/images/icons/arrow_white.svg" alt="Icon" />
      </i>
    </button>
  );
};

export const ManageComponent = ({
  list,
  content,
  noFoundMessage,
  loader,
  loaderComponent,
}) => {
  return (
    <>
      {list && list?.length === 0 ? (
        <>
          {" "}
          {loader ? (
            <>
              {loaderComponent ?? (
                <>
                  <div class="cs_iconbox_8_wrap cs_radius_30 NoRecordBox w-100">
                    <h3> {`Loading...`}</h3>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div
                class="cs_iconbox_8_wrap cs_radius_30 NoRecordBox"
                onClick={() => console.log(list)}
              >
                <h3> {noFoundMessage ?? `No Record Found`}</h3>
              </div>
            </>
          )}
        </>
      ) : (
        <>{content}</>
      )}
    </>
  );
};
