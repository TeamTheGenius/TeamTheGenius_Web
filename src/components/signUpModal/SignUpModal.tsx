import Button from "@/components/common/Button";
import SignComplateHeader from "@/components/signUpModal/SignComplateHeader";
import Modal from "react-modal";
type ModalProps = {
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
  closeModal: () => void;
};
const SignUpModal: React.FC<ModalProps> = ({
  modalIsOpen,
  closeModal,
  setModalIsOpen,
}) => {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      width: "474px",
      height: "280px",
      margin: "auto",
      border: "1px solid #ccc",
      background: "#fff",
      borderRadius: "4px",
      outline: "none",
    },
  };
  const todoLink = () => {
    alert("제작 중");
  };
  const mainLink = () => {
    setModalIsOpen(false);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="sign complate message"
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
      style={customStyles}
    >
      <SignComplateHeader />
      <div className="flex flex-col justify-between h-36">
        <Button
          content={"첫 투두 만들러 가기"}
          width={"w-full"}
          height={"h-[4.4rem]"}
          backgroundColor={"bg-_primary-50"}
          textSize={"text-_body1"}
          textColor={"text-white"}
          fontWeight={"font-semibold"}
          handleClick={todoLink}
        />
        <Button
          content={"나중에 하기"}
          width={"w-full"}
          height={"h-[2.2rem]"}
          backgroundColor={"bg-transparent"}
          textSize={"text-_caption"}
          textColor={"text-black"}
          fontWeight={"font-normal"}
          handleClick={mainLink}
        />
      </div>
    </Modal>
  );
};

export default SignUpModal;
