import { useState } from "react";
import MobCard from "@/components/Common/MobCard";
import "@/pages/Interest/antdCheckbox.css";
import interestsData from "./interests.json";
import Button from "@/components/Common/Button";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import InterestCheck from "@/components/Interest/InterestCheck";
import InterestHeader from "@/components/Interest/InterestHeader";
type Interest = {
  id: number;
  name: string;
};

type InterestsData = {
  interests: Interest[];
};

const Interest = () => {
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>([]);

  // json data
  const InterestValue: InterestsData = interestsData;

  const submit = () => {
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
      </MobCard>
    </>
  );
};
export default Interest;
