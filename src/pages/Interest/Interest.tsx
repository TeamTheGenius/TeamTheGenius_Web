import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import interestsData from "./interests.json";
import LoginMobCard from "@/components/Common/LoginMobCard";
import Button from "@/components/Common/Button";
import InterestCheck from "@/components/Interest/InterestCheck/InterestCheck";
import InterestHeader from "@/components/Interest/InterestHeader/InterestHeader";

import axios from "axios";
type Interest = {
  id: number;
  name: string;
};

type InterestsData = {
  interests: Interest[];
};

const Interest = () => {
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state;
  console.log("lo", location.state);
  // json data
  const InterestValue: InterestsData = interestsData;

  const signUpApi = async () => {
    const body = {
      email: locationState.email,
      nickname: locationState.nickName,
      information: locationState.myInfo,
      interest: ["흥미1"],
    };
    axios
      .post(`http://localhost:8080/api/auth/signup`, body)
      .then((res) => {
        console.log("res", res);
        sessionStorage.setItem("signToken", "signToken");
        navigate("/main");
      })
      .catch((err) => {
        console.log(err);
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
            handleClick={signUpApi}
          />
        </div>
      </LoginMobCard>
    </>
  );
};
export default Interest;
