import CommonModal from "@/components/Common/CommonModal/CommonModal";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import { PATH } from "@/constants/path";
import useModal from "@/hooks/useModal";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import errorIcon from "@/assets/icon/error-icon.svg";

function CommonGetErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const [modal, setModal] = useState<React.ReactNode>();
  const { isModalOpened, closeModal, openModal } = useModal();
  const navigate = useNavigate();

  const onClickReTry = () => {
    resetErrorBoundary();
  };

  const onCliclMoveToLogin = () => {
    closeModal();
    navigate(PATH.LOGIN);
  };

  useEffect(() => {
    if (error.response.data.message === "JWT가 유효하지 않습니다.") {
      setModal(
        <CommonModal
          content="재로그인이 필요합니다."
          buttonContent="로그인하기"
          onClick={onCliclMoveToLogin}
        />
      );
      openModal();
    }
  }, []);

  return (
    <>
      {isModalOpened &&
        createPortal(<ModalLayer> {modal}</ModalLayer>, document.body)}

      {!isModalOpened && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img src={errorIcon} alt="error 아이콘" className="mb-[0.3rem]" />
          <p className="text-center font-medium text-[1.8rem] text-black mb-[0.9rem]">
            조금 뒤에 다시 시도해주세요
          </p>
          <p className="text-center font-medium text-[1.2rem] mb-[2.4rem] text-[#777]">
            요청사항을 처리하는데 <br /> 실패했습니다.
          </p>

          <button
            onClick={onClickReTry}
            className=" bg-black w-[16.4rem] h-[5rem] rounded-[1rem]"
          >
            <p className="text-white font-medium text-[1.5rem]">다시시도</p>
          </button>
        </div>
      )}
    </>
  );
}

export default CommonGetErrorFallback;
