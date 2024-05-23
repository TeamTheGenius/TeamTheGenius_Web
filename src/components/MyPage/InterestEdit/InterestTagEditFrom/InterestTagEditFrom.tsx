import BottomButton from "@/components/Common/BottomButton/BottomButton";
import CommonModal from "@/components/Common/CommonModal/CommonModal";
import InterestHeader from "@/components/Interest/InterestHeader/InterestHeader";
import InterestCheckEdit from "@/components/MyPage/InterestEdit/InterestCheckEdit/InterestCheckEdit";
import { interestsData } from "@/data/InterestData";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useState } from "react";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { useModalStore } from "@/stores/modalStore";
import { usePostMyProfileInterestTag } from "@/hooks/queries/useProfileQuery";
export type Interest = {
  id: number;
  name: string;
};

function InterestTagEditFrom() {
  const { setModal, closeModal } = useModalStore();
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>([]);

  const InterestValue: Interest[] = interestsData;
  const onSuccessPostMyProfileInterestTag = () => {
    setModal(
      <CommonModal
        content="관심사 수정에 성공하였습니다."
        buttonContent="확인"
        onClick={closeModal}
      />
    );
  };

  const { mutate, isLoading } = usePostMyProfileInterestTag({
    onSuccess: onSuccessPostMyProfileInterestTag,
  });

  const handleInterestEdit = () => {
    mutate(checkedValues);
  };

  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : (
        <>
          <div className="w-full h-full px-[15.3rem] py-[15.2rem] _sm:px-[2rem] _sm:py-[15.2rem] _md:px-[2rem] _md:py-[11.2rem]">
            <div className="mb-[11rem]">
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
    </>
  );
}

export default InterestTagEditFrom;
