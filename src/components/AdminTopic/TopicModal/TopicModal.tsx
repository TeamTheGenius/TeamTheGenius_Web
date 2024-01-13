import { modalCard } from "@/utils/modalCard";
import Modal from "react-modal";

type TopicModalType = {
  setTopicModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  topicModalIsOpen: boolean;
};

const TopicModal = ({
  topicModalIsOpen,
  setTopicModalIsOpen,
}: TopicModalType) => {
  const TopicModalClose = () => {
    setTopicModalIsOpen(false);
  };
  return (
    <div>
      <Modal
        isOpen={topicModalIsOpen}
        onRequestClose={TopicModalClose}
        contentLabel="sign complete message"
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        style={modalCard}
      ></Modal>
    </div>
  );
};

export default TopicModal;
