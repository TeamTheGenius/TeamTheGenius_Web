import { useState } from "react";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import "@/pages/Interest/antdCheckbox.css";
import interestsData from "./interests.json";
import MobCard from "@/components/Common/MobCard";
import Button from "@/components/Common/Button";
import InterestCheck from "@/components/Interest/InterestCheck/InterestCheck";
import InterestHeader from "@/components/Interest/InterestHeader/InterestHeader";
import InterestInputBtn from "@/components/Interest/InterestInputButton/InterestInputBtn";
import InterestInputModal from "@/components/Interest/InterestInputModal/InterestInputModal";
import SignCompleteModal from "@/components/SignCompleteModal/SignCompleteModal";
type Interest = {
  id: number;
  name: string;
};

type InterestsData = {
  interests: Interest[];
};

const Interest = () => {
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>([]);
  const [inputModalIsOpen, setInputModalIsOpen] = useState<boolean>(false);
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState<boolean>(false);

  // json data
  const InterestValue: InterestsData = interestsData;

  const openSignupModal = () => {
    setSignUpModalIsOpen(true);
  };
  // 나중에하기 버튼
  const closeModal = () => {
    setSignUpModalIsOpen(false);
  };

  const submit = () => {
    openSignupModal();
    console.log("저장된 데이터:", checkedValues);
  };

  return (
    <>
      <MobCard>
        <InterestHeader />
        <InterestCheck
          InterestValue={InterestValue}
          setCheckedValues={setCheckedValues}
          checkedValues={checkedValues}
        />
        <div className="flex flex-col justify-between h-40">
          <InterestInputBtn setInputModalIsOpen={setInputModalIsOpen} />
          <Button
            content={"가입하기"}
            width={"w-full"}
            height={"h-[6.1rem]"}
            backgroundColor={"bg-_primary-50"}
            textSize={"text-_h2"}
            textColor={"text-white"}
            fontWeight={"font-semibold"}
            handleClick={submit}
          />
        </div>
      </MobCard>
      {signUpModalIsOpen && (
        <SignCompleteModal
          signUpModalIsOpen={signUpModalIsOpen}
          closeModal={closeModal}
          setSignUpModalIsOpen={setSignUpModalIsOpen}
        />
      )}
      {inputModalIsOpen && (
        <InterestInputModal
          inputModalIsOpen={inputModalIsOpen}
          setInputModalIsOpen={setInputModalIsOpen}
        />
      )}
    </>
  );
};
export default Interest;
