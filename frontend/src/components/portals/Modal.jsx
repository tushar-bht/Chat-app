import React from "react";
import ReactDOM from "react-dom";
import { ImCross } from "react-icons/im";

import "./Modal.css";
import BackDrop from "./BackDrop";

function ModalOverLay(props) {
  const content = (
    <div className={`modal ${props.className}`}>
      <header className={`modal__header`}>
        <h2>{props.header}</h2>
        <ImCross onClick={props.onCancel} style={{ cursor: "pointer" }} />
      </header>
      <form
        onSubmit={
          props.onSumbit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal"));
}

function Modal(props) {
  return (
    <React.Fragment>
      {props.show && <BackDrop onClick={props.onCancel} />}

      <ModalOverLay {...props} />
    </React.Fragment>
  );
}
export default Modal;
