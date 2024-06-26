import Button from "@/components/Common/Button";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import DropDownIcon from "@/assets/icon/arrow-down.svg";
import GitTokenCheckIcon from "../GitTokenCheckIcon/GitTokenCheckIcon";
import Label from "../Label/Label";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { useModalStore } from "@/stores/modalStore";
import { useGetVerifyRepository } from "@/hooks/queries/useGithubQuery";
import CommonModal from "@/components/Common/CommonModal/CommonModal";
type repoType = {
  label: string;
  value: string;
  id: string;
  repo?: string[];
  setRepoState: Dispatch<SetStateAction<string>>;
  githubTokenOk?: string;
  setRepoBoolean: Dispatch<SetStateAction<boolean>>;
  repoOk: string;
  setRepoOk: Dispatch<SetStateAction<string>>;
  setPrBoolean: React.Dispatch<React.SetStateAction<boolean>>;
};
function Repo({
  label,
  id,
  value,
  repo,
  setRepoState,
  githubTokenOk,
  setRepoBoolean,
  repoOk,
  setRepoOk,
  setPrBoolean,
}: repoType) {
  const { setModal, closeModal } = useModalStore();
  const [selectedValue, setSelectedValue] = useState("");

  const onSuccessGetVerifyRepository = () => {
    setRepoOk("OK");
    setRepoState(selectedValue);
    setRepoBoolean(true);
  };

  const onErrorGetVerifyRepository = () => {
    setRepoBoolean(false);
  };

  const {
    mutate: getVerifyRepositoryMutate,
    isLoading: getVerifyRepositoryLoading,
  } = useGetVerifyRepository({
    onSuccess: onSuccessGetVerifyRepository,
    onError: onErrorGetVerifyRepository,
  });

  const gitRepoCheck = () => {
    getVerifyRepositoryMutate({ repo: selectedValue });
  };

  const gitRepoFlase = () => {
    setModal(
      <CommonModal
        content="깃허브 토큰 등록을 먼저 등록해주세요."
        buttonContent="확인"
        onClick={closeModal}
      />
    );
  };

  const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    setRepoBoolean(false);
    setPrBoolean(false);
    setRepoOk("FAIL");
  };

  return (
    <>
      <div className={`flex flex-col w-full`}>
        <div className="flex items-center ml-[6.5rem] _md:ml-0 _sm:ml-0">
          <Label id={id} label={label} />
          <GitTokenCheckIcon repoOk={repoOk} />
        </div>
        <div className="flex items-center ml-[6.5rem] _md:ml-0 _sm:ml-0 pt-[0.6rem] text-[#F64C4C]">
          <span>한번 지정된 Repository는 다시 변경될 수 없습니다</span>
        </div>
        {getVerifyRepositoryLoading ? (
          <LoadingBox />
        ) : (
          <div className="flex items-end justify-center pt-[2.8rem]">
            <div className="w-8/12 _md:w-full _sm:w-full relative pr-[1.1rem]">
              <select
                id={id}
                value={value}
                onChange={handleDropdownChange}
                className="relative w-full bg-transparent text-[1.3rem] outline-none border-b-2 focus:border-black appearance-none z-20"
              >
                <option className="hidden">{selectedValue}</option>
                {repo?.map((item: string, id: number) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <img
                src={DropDownIcon}
                alt="down icon"
                className="absolute top-0 right-7 z-10"
              />
            </div>
            {githubTokenOk === "OK" ? (
              <Button
                width="w-[8.7rem]"
                height="h-[3.1rem]"
                content="선택완료"
                fontWeight="font-medium"
                backgroundColor="bg-[#6893FF]"
                textColor="text-white"
                textSize="text-[1.3rem]"
                handleClick={gitRepoCheck}
              />
            ) : (
              <Button
                width="w-[8.7rem]"
                height="h-[3.1rem]"
                content="선택완료"
                fontWeight="font-medium"
                backgroundColor="bg-[#666666]"
                textColor="text-[#dddddd]"
                textSize="text-[1.3rem]"
                handleClick={gitRepoFlase}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Repo;
