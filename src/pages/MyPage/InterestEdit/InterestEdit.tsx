import BottomButton from "@/components/Common/BottomButton/BottomButton";
import CommonModal from "@/components/Common/CommonModal/CommonModal";
import Header from "@/components/Common/Header/Header";
import Loading from "@/components/Common/Loading/Loading";
import MobCard from "@/components/Common/MobCard";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import InterestHeader from "@/components/Interest/InterestHeader/InterestHeader";
import InterestCheckEdit from "@/components/MyPage/InterestEdit/InterestCheckEdit/InterestCheckEdit";
import { interestsData } from "@/data/InterestData";
import { usePostMyProfileInterestTag } from "@/hooks/queries/useProfileQuery";
import useModal from "@/hooks/useModal";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { AxiosError } from "axios";
import React, { useState } from "react";

export type Interest = {
  id: number;
  name: string;
};

const InterestEdit = () => {
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>([]);
  const [modal, setModal] = useState<React.ReactNode>();
  const { isModalOpened, openModal, closeModal } = useModal();

  const InterestValue: Interest[] = interestsData;
  const onSuccessPostMyProfileInterestTag = () => {
    setModal(
      <CommonModal
        content="관심사 수정에 성공하였습니다."
        buttonContent="확인"
        onClick={closeModal}
      />
    );
    openModal();
  };
  const onErrorPostMyProfileInterestTag = (
    error: AxiosError<{ message: string }>
  ) => {
    setModal(
      <CommonMutationErrorModal error={error} closeModal={closeModal} />
    );
    openModal();
  };
  const { mutate, isLoading } = usePostMyProfileInterestTag({
    onSuccess: onSuccessPostMyProfileInterestTag,
    onError: onErrorPostMyProfileInterestTag,
  });

  const handleInterestEdit = () => {
    mutate(checkedValues);
  };

  return (
    <>
      {isModalOpened && <ModalLayer onClick={closeModal}>{modal}</ModalLayer>}

      <MobCard>
        <Header content="관심사 수정" />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="w-full px-[15.3rem] py-[15.2rem] _sm:px-[2rem] _sm:py-[15.2rem] _md:px-[2rem] _md:py-[11.2rem]">
              <div className="mb-[22rem]">
                <InterestHeader />
              </div>
              <InterestCheckEdit
                InterestValue={InterestValue}
                setCheckedValues={setCheckedValues}
                checkedValues={checkedValues}
              />
            </div>
            <BottomButton
              onClick={handleInterestEdit}
              content="수정완료"
              borderColor="border-black"
              btnMaxWidth="max-w-[46.7rem]"
              btnHeight="h-[5.1rem]"
              marginX="mx-[2rem]"
              marginXmob="_sm:ml-[20rem]"
              btnColor="bg-black"
              btnTextColor="text-white"
              btnMaxWidthMob="_sm:max-w-[16.4rem]"
            />
          </>
        )}
      </MobCard>
    </>
  );
};

export default InterestEdit;
