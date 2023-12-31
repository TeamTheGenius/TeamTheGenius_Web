import { useState } from "react";
import MobCard from "@/components/Common/MobCard";
import "@/pages/Interest/antdCheckbox.css";
import interestsData from "./interests.json";
import Button from "@/components/Common/Button";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import InterestCheck from "@/components/Interest/InterestCheck";
import InterestHeader from "@/components/Interest/InterestHeader";
import SignUpModal from "@/components/Interest/SignUpModal/SignUpModal";
import InterestInputBtn from "@/components/Interest/InterestInputBtn";
import InterestInputModal from "@/components/Interest/InterestInputModal/InterestInputModal";
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
        <SignUpModal
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
