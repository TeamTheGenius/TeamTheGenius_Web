import CommonModal from "@/components/Common/CommonModal/CommonModal";
import { AxiosError } from "axios";

interface Props {
  closeModal: () => void;
  error: AxiosError<{ message?: string }>;
}

function CommonMutationErrorModal({ closeModal }: Props) {
  return (
    <CommonModal
      content={`예상치 못한 에러가 발생하였습니다.\n잠시 후 다시 시도해주세요.`}
      buttonContent="확인"
      onClick={closeModal}
    />
  );
}

export default CommonMutationErrorModal;
