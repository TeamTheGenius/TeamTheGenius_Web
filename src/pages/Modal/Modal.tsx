import { ModalLayer } from "@/components/Common/Modal/Modal";
import { useModalStore } from "@/stores/modalStore";
import { createPortal } from "react-dom";

function Modal() {
  const { modal, isModalOpen, closeModal } = useModalStore();

  return (
    <>
      {isModalOpen &&
        createPortal(
          <ModalLayer onClick={closeModal}>{modal}</ModalLayer>,
          document.body
        )}
    </>
  );
}

export default Modal;
