import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import interestsData from "./interests.json";
import LoginMobCard from "@/components/Common/LoginMobCard";
import Button from "@/components/Common/Button";
import InterestCheck from "@/components/Interest/InterestCheck/InterestCheck";
import InterestHeader from "@/components/Interest/InterestHeader/InterestHeader";

import axios from "axios";
import { PATH } from "@/constants/path";
import signUpApi from "./api/SignUpApi";
type Interest = {
  id: number;
  name: string;
};

type InterestsData = {
  interests: Interest[];
};

const Interest = () => {
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>([]);

  const location = useLocation();
  const locationState = location.state;

  const InterestValue: InterestsData = interestsData;

  const handleSignUp = async () => {
    await signUpApi({
      identifier: locationState.gitNickName,
      nickname: locationState.nickName,
      information: locationState.myInfo,
      interest: checkedValues,
    });
  };

  return (
    <>
      <LoginMobCard>
        <InterestHeader />
        <InterestCheck
          InterestValue={InterestValue}
          setCheckedValues={setCheckedValues}
          checkedValues={checkedValues}
        />
        <div className="flex flex-col justify-between h-40">
          <Button
            content={"가입하기"}
            width={"w-full"}
            height={"h-[6.1rem]"}
            backgroundColor={"bg-_coral-70"}
            textSize={"text-_h2"}
            textColor={"text-white"}
            fontWeight={"font-semibold"}
            handleClick={handleSignUp}
          />
        </div>
      </LoginMobCard>
    </>
  );
};
export default Interest;
