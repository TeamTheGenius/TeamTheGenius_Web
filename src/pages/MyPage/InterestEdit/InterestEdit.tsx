import BottomNav from "@/components/Common/BottomNav/BottomNav";
import Button from "@/components/Common/Button";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";

import InterestCheck from "@/components/Interest/InterestCheck/InterestCheck";
import InterestHeader from "@/components/Interest/InterestHeader/InterestHeader";
import { interestsData } from "@/data/InterestData";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useState } from "react";

export type Interest = {
  id: number;
  name: string;
};

const InterestEdit = () => {
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>([]);

  const InterestValue: Interest[] = interestsData;

  const handleInterestEdit = async () => {
    console.log("수정 요청");
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
      </MobCard>
    </>
  );
};

export default InterestEdit;
