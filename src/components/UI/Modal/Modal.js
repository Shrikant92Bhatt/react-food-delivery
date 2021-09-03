/* eslint-disable react/prop-types */
import React from "react";
import reactDom from "react-dom";
import cs from "./Modal.module.css";

const BackDrop = (props) => {
  return <div className={cs.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={cs.modal}>
      <div className={cs.content}>{props.children}</div>
    </div>
  );
};
const portalContainerElement = document.getElementById("overlay");

const Modal = (props) => {
  return (
    <React.Fragment>
      {reactDom.createPortal(
        <BackDrop onClose={props.onClose} />,
        portalContainerElement
      )}
      {reactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalContainerElement
      )}
    </React.Fragment>
  );
};

export default Modal;
