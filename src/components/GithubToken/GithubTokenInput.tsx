import Button from "@/components/Common/Button";
import { GithubTokenInputType } from "@/types/githubTokenType";
import { ChangeEvent, useState } from "react";
import GitTokenCheckIcon from "../GitPullReqConnect/GitTokenCheckIcon/GitTokenCheckIcon";
import Label from "../GitPullReqConnect/Label/Label";
import LoadingBox from "../Common/Loading/LoadingBox/LoadingBox";
import {
  useGetTokenVerify,
  usePostTokenRegister,
} from "@/hooks/queries/useGithubQuery";
import { AxiosError } from "axios";
const GithubTokenInput = ({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  githubBoolean,
  setGithubBoolean,
}: GithubTokenInputType) => {
  const [tokenState, setTokenState] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [tokenBoolean, setTokenBoolean] = useState(false);
  const { data: githubTokenInputOk } = useGetTokenVerify();

  const onSuccessUsePostTokenRegister = () => {
    setLoadingState(false);
    setTokenBoolean(true);
    setGithubBoolean(true);
  };
  const onErrorUsePostTokenRegister = (
    error: AxiosError<{ message: string }>
  ) => {
    setLoadingState(false);
    setTokenBoolean(false);
    if (error.response?.data.message) {
      setTokenState(error.response?.data.message);
    }
  };
  const { mutate: postTokenRegisterMutate } = usePostTokenRegister({
    onSuccess: onSuccessUsePostTokenRegister,
    onError: onErrorUsePostTokenRegister,
  });

  const gitTokenCheck = () => {
    setLoadingState(true);
    postTokenRegisterMutate({ githubToken: value });
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
        <GitTokenCheckIcon githubTokenInputOk={githubTokenInputOk} />
      </div>
      {loadingState ? (
        <LoadingBox />
      ) : (
        <>
          <div className="flex items-end justify-center pt-[2.5rem]">
            <div className="w-8/12 _md:w-full _sm:w-full relative pr-[1.1rem]">
              {githubTokenInputOk === "OK" ? (
                <span className="githubtoken-placeholder focus:border-black w-full text-[1.3rem] outline-none relative text-[#4C7CF6]">
                  등록 완료 되었습니다.
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
              {tokenBoolean === false ? (
                <>
                  <div className="text-[#ff4356] font-[1.2rem] absolute right-[1rem]">
                    {tokenState}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            {githubTokenInputOk === "OK" ? (
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
        </>
      )}
    </div>
  );
};
export default GithubTokenInput;
