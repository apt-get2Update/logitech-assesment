import React from "react";
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="modal-header">
          <header> Interface settings for order book</header>
          <button onClick={handleClose}>X</button>
        </div>
        
        {children}
      </section>
    </div>
  );
};

export default Modal;
