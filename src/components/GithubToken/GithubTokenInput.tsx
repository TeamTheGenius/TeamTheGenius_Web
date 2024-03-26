import Button from "@/components/Common/Button";
import { GithubTokenInputType } from "@/types/githubTokenType";
import { ChangeEvent, useState } from "react";

import postGithubTokenRegi from "@/apis/postGithubTokenRegi";
import GitTokenCheckIcon from "../GitPullReqConnect/GitTokenCheckIcon/GitTokenCheckIcon";
import Label from "../GitPullReqConnect/Label/Label";
import { QueryClient, useQueryClient } from "react-query";
const GithubTokenInput = ({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  githubBoolean,
  setGithubBoolean,
  githubTokenOk,
}: GithubTokenInputType) => {
  const [tokenState, setTokenState] = useState("");
  const [tokenBoolean, setTokenBoolean] = useState(false);
  const queryClient: QueryClient = useQueryClient();
  const gitTokenCheck = () => {
    postGithubTokenRegi({
      queryClient: queryClient,
      githubToken: value,
      setTokenState: setTokenState,
      setTokenBoolean: setTokenBoolean,
      setGithubBoolean: setGithubBoolean,
    });
  };

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (githubBoolean) {
      setGithubBoolean(false);
    }
    onChange(event);
  };

  return (
    <div className={`flex flex-col w-full`}>
      <div className="flex items-center ml-[6.5rem] _md:ml-0 _sm:ml-0">
        <Label id={id} label={label} />
        <GitTokenCheckIcon githubTokenOk={githubTokenOk} />
      </div>
      <div className="flex items-end justify-center pt-[2.5rem]">
        <div className="w-8/12 _md:w-full _sm:w-full relative pr-[1.1rem]">
          {githubTokenOk === "OK" ? (
            <span className="githubtoken-placeholder focus:border-black w-full text-[1.3rem] outline-none relative">
              깃허브 토큰이 등록되어있습니다.
            </span>
          ) : (
            <input
              className="githubtoken-placeholder border-b-2 focus:border-black w-full text-[1.3rem] outline-none relative"
              type="text"
              id={id}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={inputChange}
            />
          )}
          {tokenBoolean !== false ? (
            <>
              <div className="text-[#ff4356] font-[1.2rem] absolute right-[1rem]">
                {tokenState}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        {githubTokenOk === "OK" ? (
          <></>
        ) : (
          <Button
            width="w-[6.2rem]"
            height="h-[3.1rem]"
            content="등록"
            fontWeight="font-medium"
            backgroundColor="bg-[#6893FF]"
            textColor="text-white"
            textSize="text-[1.3rem]"
            handleClick={gitTokenCheck}
          />
        )}
      </div>
    </div>
  );
};
export default GithubTokenInput;
