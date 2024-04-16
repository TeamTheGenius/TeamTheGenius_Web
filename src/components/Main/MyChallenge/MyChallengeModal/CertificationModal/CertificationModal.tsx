import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { Modal } from "@/components/Common/Modal/Modal";
import { usePostTodayCertification } from "@/hooks/queries/useCertificationQuery";
import { CertificationDataType } from "@/types/certificationType";
import { getToday } from "@/utils/getToday";
import React, { useEffect } from "react";
import CertificationResultModal from "../CertificationResultModal/CertificationResultModal";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import CommonModal from "@/components/Common/CommonModal/CommonModal";

interface Props {
  instanceId: number;
  setModal: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  closeModal: () => void;
}
function CertificationModal({ instanceId, setModal, closeModal }: Props) {
  const onSuccessPostTodayCertification = (res: CertificationDataType) => {
    if (res.certificateStatus === "NOT_YET") {
      setModal(
        <CommonModal
          content={"유효한 Pull Request가 없어서\n인증에 실패하셨습니다."}
          buttonContent="확인"
          onClick={closeModal}
        />
      );
    } else {
      setModal(
        <CertificationResultModal
          content="인증 갱신에 성공하셨습니다."
          closeModal={closeModal}
        />
      );
    }
  };

  const onErrorPostTodayCertification = (error: any) => {
    setModal(
      <CommonMutationErrorModal closeModal={closeModal} error={error} />
    );
  };
  const {
    mutate: postTodayCertificationMutate,
    isLoading: postTodayCertificationLoading,
  } = usePostTodayCertification({
    onSuccess: onSuccessPostTodayCertification,
    onError: onErrorPostTodayCertification,
  });

  useEffect(() => {
    postTodayCertificationMutate({
      instanceId: instanceId,
      targetDate: getToday(),
    });
  }, []);

  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      {postTodayCertificationLoading && <LoadingBox />}
    </Modal.ModalContentBox>
  );
}

export default CertificationModal;
