import React, { Children } from "react";

interface ModalProps {
    modalOpen :boolean,
    setModalOpen:(open:boolean) => boolean | void;
    children:React.ReactNode;
}

 const Modal: React.FC<ModalProps> = ({modalOpen,setModalOpen, children}) =>{
    return   <dialog id="my_modal_1"  className={`modal ${modalOpen ? "modal-open" : ""}`}>
    <div className="modal-box">
      <div className="modal-action">
        <form method="dialog">
          {children}
          <button onClick={() => setModalOpen(false)} className="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
 }

 export default Modal;