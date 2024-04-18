import CommonModal from "@/components/Common/CommonModal/CommonModal";
import { PATH } from "@/constants/path";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  closeModal: () => void;
  error: AxiosError<{ message?: string }>;
}

function CommonMutationErrorModal({ closeModal, error }: Props) {
  const navigate = useNavigate();
  const onCliclMoveToLogin = () => {
    closeModal();
    navigate(PATH.LOGIN);
  };

  return (
    <>
      {error.response?.data.message === "JWT가 유효하지 않습니다." ? (
        <CommonModal
          content="재로그인이 필요합니다."
          buttonContent="로그인하기"
          onClick={onCliclMoveToLogin}
        />
      ) : (
        <CommonModal
          content={`예상치 못한 에러가 발생하였습니다.\n잠시 후 다시 시도해주세요.`}
          buttonContent="확인"
          onClick={closeModal}
        />
      )}
    </>
  );
}

export default CommonMutationErrorModal;
