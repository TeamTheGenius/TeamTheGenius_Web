import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { Modal } from "@/components/Common/Modal/Modal";
import { CertificationDataType } from "@/types/certificationType";
import { getToday } from "@/utils/getToday";
import { useEffect } from "react";
import CommonModal from "@/components/Common/CommonModal/CommonModal";
import { useModalStore } from "@/stores/modalStore";
import { usePostTodayCertification } from "@/hooks/queries/useCertificationQuery";

interface Props {
  instanceId: number;
}
function CertificationModal({ instanceId }: Props) {
  const { setModal, closeModal } = useModalStore();

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
        <CommonModal
          content="인증 갱신에 성공하셨습니다."
          buttonContent="확인"
          onClick={closeModal}
        />
      );
    }
  };

  const {
    mutate: postTodayCertificationMutate,
    isLoading: postTodayCertificationLoading,
  } = usePostTodayCertification({
    onSuccess: onSuccessPostTodayCertification,
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
