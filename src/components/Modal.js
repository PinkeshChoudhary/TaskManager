import React from "react";
import classes from "./Css/Modal.module.css";
const Modal = (props) => {
  return (
    <div className={classes.modalCenter}>
      <div className={classes.modalChildren}>
        <div className={classes.closeBtn} onClick={props.onClose}>
          {/* {" "} */}X
        </div>
        {props.children}
        <div className={classes.closeBtn}>
          <button onClick={props.onSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
