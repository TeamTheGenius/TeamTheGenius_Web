import Button from "@/components/Common/Button";
import { GithubTokenInputType } from "@/types/githubTokenType";
import { ChangeEvent, useState } from "react";
import checkIcon from "@/assets/icon/check-icon.svg";
import failIcon from "@/assets/icon/sign-icon.svg";
import postGithubTokenRegi from "@/apis/postGithubTokenRegi";
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
  const [tokenBoolean, setTokenBoolean] = useState(false);

  const gitTokenCheck = () => {
    postGithubTokenRegi({
      githubToken: value,
      setTokenState: setTokenState,
      setTokenBoolean: setTokenBoolean,
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
        <label
          htmlFor={id}
          className={`text-[1.8rem] font-bold relative mr-[1.2rem]`}
        >
          {label}
        </label>
        <div>
          {tokenBoolean === false ? (
            <>
              <img src={failIcon} alt="Icon" />
            </>
          ) : (
            <>
              <img src={checkIcon} alt="Icon" />
            </>
          )}
        </div>
      </div>
      <div className="flex items-end justify-center pt-[2.5rem]">
        <div className="w-8/12 _md:w-full _sm:w-full relative pr-[1.1rem]">
          <input
            className="githubtoken-placeholder border-b-2 focus:border-black w-full text-[1.3rem] outline-none relative"
            type="text"
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={inputChange}
          />
          {tokenBoolean === false ? (
            <>
              <div className="text-[#ff4356] font-[1.2rem] absolute right-[1rem]">
                {tokenState}
              </div>
            </>
          ) : (
            <>
              <div className="text-[#4C7CF6] font-[1.2rem] absolute right-[1rem]">
                등록 완료 되었습니다
              </div>
            </>
          )}
        </div>
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
      </div>
    </div>
  );
};
export default GithubTokenInput;
