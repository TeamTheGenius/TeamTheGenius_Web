import postInterestEditApi from "@/apis/postInterestEditApi";
import BottomButton from "@/components/Common/BottomButton/BottomButton";
import Header from "@/components/Common/Header/Header";
import Loading from "@/components/Common/Loading/Loading";
import MobCard from "@/components/Common/MobCard";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import InterestHeader from "@/components/Interest/InterestHeader/InterestHeader";
import { EditModal } from "@/components/MyPage/EditModal/EditModal";
import InterestCheckEdit from "@/components/MyPage/InterestEdit/InterestCheckEdit/InterestCheckEdit";
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
  const [isLoading, setIsLoading] = useState(false);
  const { isModalOpened, openModal, closeModal } = useModal();

  const InterestValue: Interest[] = interestsData;

  const handleInterestEdit = async () => {
    setIsLoading(true);
    postInterestEditApi({
      setIsLoading: setIsLoading,
      interestEditData: checkedValues,
      setEditApiBoolean: setEditApiBoolean,
    });
    openModal();
  };

  return (
    <>
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

      {isModalOpened && (
        <ModalLayer onClick={closeModal}>
          <EditModal
            isLoading={isLoading}
            editBoolean={editApiBoolean}
            success="관심사 수정에 성공했습니다"
            fail="관심사 수정에 실패했습니다"
            buttonText="확인하기"
            editHandle={() => {
              closeModal();
            }}
          />
        </ModalLayer>
      )}
    </>
  );
};

export default InterestEdit;
