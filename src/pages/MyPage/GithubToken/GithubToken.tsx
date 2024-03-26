import Header from "@/components/Common/Header/Header";
import GithubTokenInput from "@/components/GithubToken/GithubTokenInput";
import { useState } from "react";
import "@/pages/MyPage/GithubToken/githubTokenStyle.css";
import Button from "@/components/Common/Button";
import { useNavigate } from "react-router-dom";
import MobCard from "@/components/Common/MobCard";
const GithubToken = () => {
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
    <MobCard>
      <Header content="Github Token 등록" />
      <div className="pt-[8.5rem] px-[2.2rem] flex justify-center items-center flex-col">
        <GithubTokenInput
          label="Github Token"
          id="githubToken"
          name="githubToken"
          placeholder="깃허브 토큰을 작성하시면 됩니다."
          githubBoolean={githubBoolean}
          setGithubBoolean={setGithubBoolean}
          value={nickName}
          onChange={handleNickNameChange}
        />
        <div className="mt-[5.5rem]">
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
      </div>
    </MobCard>
  );
};

export default GithubToken;
