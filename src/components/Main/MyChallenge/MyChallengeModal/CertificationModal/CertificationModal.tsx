import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { Modal } from "@/components/Common/Modal/Modal";
import { QUERY_KEY } from "@/constants/queryKey";
import { usePostTodayCertification } from "@/hooks/queries/useCertificationQuery";
import { CertificationDataType } from "@/types/certificationType";
import { getToday } from "@/utils/getToday";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import CertificationResultModal from "../CertificationResultModal/CertificationResultModal";

interface Props {
  instanceId: number;
  setModal: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  closeModal: () => void;
}
function CertificationModal({ instanceId, setModal, closeModal }: Props) {
  const queryClient = useQueryClient();

  const onSuccessPostTodayCertification = (res: CertificationDataType) => {
    if (res.certificateStatus === "NOT_YET") {
      setModal(
        <CertificationResultModal
          content="인증 갱신에 실패하셨습니다."
          closeModal={closeModal}
        />
      );
    } else {
      setModal(
        <CertificationResultModal
          content="인증 갱신에 성공하셨습니다."
          closeModal={closeModal}
        />
      );
      queryClient.invalidateQueries(QUERY_KEY.MY_ACTIVITY_CHALLENGES);
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
