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
import getUserRepoApi from "@/apis/getUserRepoApi";
import BottomButton from "@/components/Common/BottomButton/BottomButton";
import postChallengeRepoRegiApi from "@/apis/postChallengeRepoRegiApi";
import getGithubTokenApi from "@/apis/getGithubTokenApi";
import { useQuery } from "react-query";
import { decrypt } from "@/hooks/useCrypto";
import Loading from "@/components/Common/Loading/Loading";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import useModal from "@/hooks/useModal";
import GitPullReqModal from "@/components/GitPullReqConnect/GitPullReqModal/GitPullReqModal";

const GitPullReqConnect = () => {
  const [githubBoolean, setGithubBoolean] = useState(false);
  const [repoBoolean, setRepoBoolean] = useState(false);
  const [prBoolean, setPrBoolean] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [repoState, setRepoState] = useState("");
  const [nickName, setNickName] = useState("");
  const [errState, setErrState] = useState("");
  const [modal, setModal] = useState<React.ReactNode>();
  const { openModal, closeModal, isModalOpened } = useModal();
  const [repoOk, setRepoOk] = useState("ready");

  const navigate = useNavigate();
  const param = useParams();
  const paramNumber = param.id;
  const decryptNumber = decrypt(paramNumber);
  const handleNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const notionUrl = () => {
    alert("노션 웹으로 이동하기");
    // navigate("notionUrl");
  };

  const challengeRegiHandle = () => {
    setLoadingState(true);
    postChallengeRepoRegiApi({
      openModal: openModal,
      setErrState: setErrState,
      setLoadingState: setLoadingState,
      navigate: navigate,
      instanceId: decryptNumber,
      repo: repoState,
    });
    setModal(<GitPullReqModal closeModal={closeModal} errState={errState} />);
  };
  const challengeRegiFalseHandle = () => {
    alert("pull request 확인 후 참가하기가 가능합니다.");
  };

  const { data: githubTokenOk } = useQuery<string>({
    queryKey: ["getGithubToken"],
    queryFn: getGithubTokenApi,
  });

  const { data: repoList } = useQuery<string[]>({
    queryKey: ["getUserRepo"],
    queryFn: getUserRepoApi,
    enabled: githubTokenOk === "OK",
  });
  console.log("repoList", repoList);
  if (loadingState) {
    return <Loading />;
  }
  return (
    <>
      {modal && isModalOpened && (
        <ModalLayer onClick={closeModal}>{modal}</ModalLayer>
      )}
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
            githubTokenOk={githubTokenOk}
          />
          <div className="w-full flex justify-center mt-[5.5rem] mb-[4.6rem]">
            <Button
              width="w-[30.6rem]"
              height="h-[5.2rem]"
              content="Github Token 연결 방법"
              fontWeight="font-medium"
              backgroundColor={`bg-[#FF4356]`}
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
              repo={repoList}
              setRepoOk={setRepoOk}
              repoOk={repoOk}
              id="repository"
              value={nickName}
              setRepoState={setRepoState}
              setRepoBoolean={setRepoBoolean}
              githubTokenOk={githubTokenOk}
            />
          </div>
          <div className="w-full mb-[3rem]">
            <PullReq
              label="3. Pull Request"
              repoState={repoState}
              setPrBoolean={setPrBoolean}
              repoBoolean={repoBoolean}
              prBoolean={prBoolean}
            />
          </div>
          <div className="w-full">
            <PullReqExp label="Pull Request 연결 방법" />
          </div>
          {prBoolean === true ? (
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
          ) : (
            <BottomButton
              onClick={challengeRegiFalseHandle}
              content="참가하기"
              borderColor="border-[#666666]"
              btnTextColor="text-[#dddddd]"
              btnHeight="h-[6.1rem]"
              marginX="mx-[2rem]"
              btnColor="bg-[#666666]"
              btnMaxWidth="max-w-[46.7rem]"
            />
          )}
        </div>
      </MobCard>
    </>
  );
};

export default GitPullReqConnect;
