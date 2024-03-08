import postInterestEditApi from "@/apis/postInterestEditApi";
import BottomButton from "@/components/Common/BottomButton/BottomButton";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import { ModalLayer } from "@/components/Common/Modal/Modal";

import InterestCheck from "@/components/Interest/InterestCheck/InterestCheck";
import InterestHeader from "@/components/Interest/InterestHeader/InterestHeader";
import { InterestEditModal } from "@/components/MyPage/InterestEdit/InterestEditModal/InterestEditModal";
import { interestsData } from "@/data/InterestData";
import useModal from "@/hooks/useModal";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useState } from "react";

export type Interest = {
  id: number;
  name: string;
};

const InterestEdit = () => {
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>([]);
  const [editApiBoolean, setEditApiBoolean] = useState(false);
  const { isModalOpened, openModal, closeModal, modalRef } = useModal();

  const InterestValue: Interest[] = interestsData;

  const handleInterestEdit = async () => {
    postInterestEditApi({
      interestEditData: checkedValues,
      openModal: openModal,
      setEditApiBoolean: setEditApiBoolean,
    });
    openModal();
  };

  return (
    <>
      <MobCard>
        <Header content="관심 목록" />
        <div className="w-full px-[15.3rem] py-[15.2rem] _sm:px-[2rem] _sm:py-[15.2rem] _md:px-[2rem] _md:py-[11.2rem]">
          <div className="mb-[22rem]">
            <InterestHeader />
          </div>
          <InterestCheck
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
      </MobCard>
      {isModalOpened && (
        <ModalLayer modalRef={modalRef}>
          <InterestEditModal
            closeModal={closeModal}
            editApiBoolean={editApiBoolean}
          />
        </ModalLayer>
      )}
    </>
  );
};

export default InterestEdit;
