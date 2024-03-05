import Line from "@/components/Common/Line/Line";
import Button from "@/components/Common/Button";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import GithubTokenInput from "@/components/GithubToken/GithubTokenInput";
import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Repo from "@/components/GitPullReqConnect/Repo/Repo";
import PullReq from "@/components/GitPullReqConnect/PullReq/PullReq";
import PullReqExp from "@/components/GitPullReqConnect/PullReqExp/PullReqExp";
import { useQuery } from "@tanstack/react-query";
import getUserRepoApi from "@/apis/getUserRepoApi";
import BottomButton from "@/components/Common/BottomButton/BottomButton";
import postChallengeRepoRegiApi from "@/apis/postChallengeRepoRegiApi";

const GitPullReqConnect = () => {
  // 등록 시 이미지 변환boolean
  const [githubBoolean, setGithubBoolean] = useState(false);
  const [repoBoolean, setRepoBoolean] = useState(false);
  const [repoState, setRepoState] = useState("");

  const [nickName, setNickName] = useState("");

  const navigate = useNavigate();
  const param = useParams();
  const paramNumber = param.id;
  const handleNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const notionUrl = () => {
    alert("노션 웹으로 이동하기");
    // navigate("notionUrl");
  };

  const challengeRegiHandle = () => {
    postChallengeRepoRegiApi({
      instanceId: paramNumber,
      repo: repoState,
    });
  };
  const { data } = useQuery<any>({
    queryKey: ["getUserRepo"],
    queryFn: () => getUserRepoApi(),
  });

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
              repo={data}
              id="repository"
              value={nickName}
              setRepoState={setRepoState}
            />
          </div>
          <div className="w-full mb-[3rem]">
            <PullReq label="3. Pull Request" repoState={repoState} />
          </div>
          <div className="w-full">
            <PullReqExp label="Pull Request 연결 방법" />
          </div>
          <BottomButton
            onClick={challengeRegiHandle}
            content="참가하기"
            borderColor="border-[#FF4356]"
            btnTextColor="text-[#ffffff]"
            btnHeight="h-[6.1rem]"
            marginX="mx-[2rem]"
            btnColor="bg-[#ff4356]"
            btnMaxWidth="max-w-[46.7rem]"
          />
        </div>
      </MobCard>
    </>
  );
};

export default GitPullReqConnect;
