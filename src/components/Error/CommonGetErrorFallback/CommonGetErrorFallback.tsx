import CommonModal from "@/components/Common/CommonModal/CommonModal";
import { PATH } from "@/constants/path";
import { useEffect } from "react";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import errorIcon from "@/assets/icon/error-icon.svg";
import { useModalStore } from "@/stores/modalStore";

function CommonGetErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { setModal, closeModal, isModalOpen } = useModalStore();
  const navigate = useNavigate();

  const onClickReTry = () => {
    resetErrorBoundary();
  };

  const onCliclMoveToLogin = () => {
    closeModal();
    navigate(PATH.LOGIN);
  };

  useEffect(() => {
    if (
      error?.response?.data?.message === "JWT가 유효하지 않습니다." ||
      error?.response?.data?.message === "Cookie에 토큰이 존재하지 않습니다."
    ) {
      setModal(
        <CommonModal
          content="재로그인이 필요합니다."
          buttonContent="로그인하기"
          onClick={onCliclMoveToLogin}
        />
      );
    }
  }, []);

  return (
    <>
      {!isModalOpen && (
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
