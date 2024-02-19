import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckboxValueType } from "antd/es/checkbox/Group";

import LoginMobCard from "@/components/Common/LoginMobCard";
import Button from "@/components/Common/Button";
import InterestCheck from "@/components/Interest/InterestCheck/InterestCheck";
import InterestHeader from "@/components/Interest/InterestHeader/InterestHeader";
import signUpApi from "@/apis/postSignUpApi";
import { interestsData } from "@/data/InterestData";

type Interest = {
  id: number;
  name: string;
};

const Interest = () => {
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>([]);

  const location = useLocation();
  const locationState = location.state;

  const navigate = useNavigate();

  const InterestValue: Interest[] = interestsData;

  const handleSignUp = async () => {
    await signUpApi({
      identifier: locationState.gitNickName,
      nickname: locationState.nickName,
      information: locationState.myInfo,
      interest: checkedValues,
      navigate,
    });
  };

  return (
    <>
      <LoginMobCard>
        <div className="mb-[22rem]">
          <InterestHeader />
        </div>
        <InterestCheck
          InterestValue={InterestValue}
          setCheckedValues={setCheckedValues}
          checkedValues={checkedValues}
        />
        <div className="flex flex-col justify-between h-40 mt-[22rem]">
          <Button
            content={"가입하기"}
            width={"w-full"}
            height={"h-[6.1rem]"}
            backgroundColor={"bg-_coral-70"}
            textSize={"text-[1.7rem]"}
            textColor={"text-white"}
            fontWeight={"font-medium"}
            handleClick={handleSignUp}
          />
        </div>
      </LoginMobCard>
    </>
  );
};
export default Interest;
