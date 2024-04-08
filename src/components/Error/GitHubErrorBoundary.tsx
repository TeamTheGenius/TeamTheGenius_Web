import { createPortal } from "react-dom";
import useModal from "@/hooks/useModal";
import { FallbackProps } from "react-error-boundary";
import { ModalLayer } from "../Common/Modal/Modal";
import React, { useEffect, useState } from "react";
import GitPullReqModal from "../GitPullReqConnect/GitPullReqModal/GitPullReqModal";

const GitHubErrorBoundaryFallBack = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const { openModal, closeModal, isModalOpened } = useModal();
  const [modalContent, setModalContent] = useState<React.ReactNode>();

  const onclickModalClose = () => {
    closeModal();
    resetErrorBoundary();
  };

  useEffect(() => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message ===
        "해당 레포지토리에 PR이 존재하지 않습니다."
    ) {
      const message = error.response.data.message;
      setModalContent(
        <GitPullReqModal
          closeModal={onclickModalClose}
          messageState={message}
        />
      );
      openModal();
    }
  }, []);

  return (
    <>
      {isModalOpened &&
        createPortal(
          <ModalLayer onClick={onclickModalClose}>{modalContent}</ModalLayer>,
          document.body
        )}
    </>
  );
};

export default GitHubErrorBoundaryFallBack;
