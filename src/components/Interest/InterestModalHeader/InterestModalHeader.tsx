import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type InterestModalHeaderType = {
  closeModal: () => void;
};
const InterestModalHeader = ({ closeModal }: InterestModalHeaderType) => {
  return (
    <div className="flex items-center justify-between mt-[3.1rem] mb-[3rem]">
      <h1 className="text-_h3 font-pretendard font-semibold text-_neutral-80 leading-4">
        추가할 관심사를 입력해주세요
      </h1>
      <button onClick={closeModal}>
        <FontAwesomeIcon icon={faTimes} className="text-_h4" />
      </button>
    </div>
  );
};

export default InterestModalHeader;
