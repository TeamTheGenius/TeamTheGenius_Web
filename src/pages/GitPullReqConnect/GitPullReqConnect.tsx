import Line from "@/components/Common/Line/Line";
import Button from "@/components/Common/Button";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import GithubTokenInput from "@/components/GithubToken/GithubTokenInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Repo from "@/components/GitPullReqConnect/Repo/Repo";
import PullReq from "@/components/GitPullReqConnect/PullReq/PullReq";
import PullReqExp from "@/components/GitPullReqConnect/PullReqExp/PullReqExp";

const GitPullReqConnect = () => {
  const [githubBoolean, setGithubBoolean] = useState(false);
  const [nickName, setNickName] = useState("");

  const navigate = useNavigate();

  const handleNickNameChange = (e: any) => {
    setNickName(e.target.value);
  };
  const notionUrl = () => {
    navigate("notionUrl");
  };
  return (
    <>
      <MobCard>
        <Header content="Github 연결 설정" />
        <div className="pt-[8.5rem] px-[2.2rem] flex justify-center items-center flex-col">
          <GithubTokenInput
            label="1. Github Token"
            id="githubToken"
            name="githubToken"
            placeholder="깃허브 토큰을 작성하시면 됩니다."
            githubBoolean={githubBoolean}
            setGithubBoolean={setGithubBoolean}
            value={nickName}
            onChange={handleNickNameChange}
          />
          <div className="w-full flex justify-center mt-[5.5rem] mb-[4.6rem]">
            <Button
              width="w-[30.6rem]"
              height="h-[5.2rem]"
              content="Github Token 연결 방법"
              fontWeight="font-medium"
              backgroundColor="bg-[#FF4356]"
              textColor="text-white"
              textSize="text-[1.6rem]"
              handleClick={notionUrl}
            />
          </div>
          <div className="w-full mb-[2.5rem]">
            <Line />
          </div>
          <div className="w-full mb-[3.4rem]">
            <Repo
              label="2. Repository 선택"
              id="repository"
              name="repository"
              value={nickName}
              onChange={handleNickNameChange}
            />
          </div>
          <div className="w-full mb-[3rem]">
            <PullReq label="3. Pull Request" />
          </div>
          <div className="w-full">
            <PullReqExp label="Pull Request 연결 방법" />
          </div>
        </div>
      </MobCard>
    </>
  );
};

export default GitPullReqConnect;
