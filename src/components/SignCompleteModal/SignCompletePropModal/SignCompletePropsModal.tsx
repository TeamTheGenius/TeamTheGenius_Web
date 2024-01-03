import Button from "@/components/Common/Button";
import SignCompleteHeader from "@/components/SignCompleteModal/SignCompleteHeader/SignCompleteHeader";
import { modalCard } from "@/utils/modalCard";
import Modal from "react-modal";
type ModalProps = {
  signUpModalIsOpen: boolean;
  signUpcloseModal: () => void;
};
const SignCompletePropsModal: React.FC<ModalProps> = ({
  signUpModalIsOpen,
  signUpcloseModal,
}) => {
  const todoLink = () => {
    alert("제작 중");
  };
  const mainLink = () => {
    signUpcloseModal();
  };
  return (
    <Modal
      isOpen={signUpModalIsOpen}
      onRequestClose={signUpcloseModal}
      contentLabel="sign complete message"
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
      style={modalCard}
    >
      <SignCompleteHeader />
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

export default SignCompletePropsModal;
