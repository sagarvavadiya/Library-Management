import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ButtonLoader } from "../../designHelper";

function CommonModel({
  title,
  BodyComponent,
  show,
  onSubmit,
  toogle,
  loader,
  noFooter,
}) {
  return (
    <>
      <Modal show={show} onHide={toogle}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{BodyComponent}</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={toogle}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            {loader ? <ButtonLoader /> : ""}
            Submit
          </Button> */}

          <div className={`col-lg-12 ${noFooter ? "d-none" : ""}`}>
            <button className="cs_btn cs_style_1" onClick={onSubmit}>
              {loader ? <ButtonLoader /> : ""}
              <span>Submit</span>
              <i>
                <img src="/images/icons/arrow_white.svg" alt="Icon" />
                <img src="/images/icons/arrow_white.svg" alt="Icon" />
              </i>
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommonModel;
