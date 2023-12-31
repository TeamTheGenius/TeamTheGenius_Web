import Button from "@/components/Common/Button";
import SignComplateHeader from "@/components/Interest/SignUpModal/SignComplateHeader";
import { modalCard } from "@/utils/modalCard";
import Modal from "react-modal";
type ModalProps = {
  signUpModalIsOpen: boolean;
  setSignUpModalIsOpen: (isOpen: boolean) => void;
  closeModal: () => void;
};
const SignUpModal: React.FC<ModalProps> = ({
  signUpModalIsOpen,
  closeModal,
  setSignUpModalIsOpen,
}) => {
  const todoLink = () => {
    alert("제작 중");
  };
  const mainLink = () => {
    setSignUpModalIsOpen(false);
  };
  return (
    <Modal
      isOpen={signUpModalIsOpen}
      onRequestClose={closeModal}
      contentLabel="sign complate message"
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
      style={modalCard}
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
